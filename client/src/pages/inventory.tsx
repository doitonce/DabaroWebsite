import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Plus, Edit, Trash2, Package, Save, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Inventory {
  id: number;
  itemName: string;
  silverContent: number;
  specification: string;
  isRolled: boolean;
  quantityGrams: string; // Numeric type from DB comes as string
  createdAt: string;
  updatedAt: string;
}

interface SilverPrice {
  id: number;
  date: string;
  priceKrw: number;
  priceUsd: number;
  priceOunce: number;
  createdAt: string;
  updatedAt: string;
}

const inventorySchema = z.object({
  itemName: z.string().min(1, "품목을 입력해주세요"),
  silverContent: z.number().min(1, "은함량을 입력해주세요").max(100, "은함량은 100% 이하여야 합니다"),
  specification: z.string().min(1, "규격을 입력해주세요"),
  isRolled: z.boolean().default(false),
  quantityGrams: z.number().min(0.1, "수량을 입력해주세요"),
});

type InventoryFormData = z.infer<typeof inventorySchema>;

export default function Inventory() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: inventory, isLoading } = useQuery<Inventory[]>({
    queryKey: ["/api/inventory"],
  });

  const { data: silverPrice } = useQuery<SilverPrice>({
    queryKey: ["/api/silver-prices/latest"],
  });

  const form = useForm<InventoryFormData>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      itemName: "",
      silverContent: 0,
      specification: "",
      isRolled: false,
      quantityGrams: 0,
    },
  });

  const editForm = useForm<InventoryFormData>({
    resolver: zodResolver(inventorySchema),
  });

  // Watch for changes in silver content and rolled material to calculate unit price
  const watchedSilverContent = form.watch("silverContent");
  const watchedIsRolled = form.watch("isRolled");

  // Calculate unit price based on current silver price and content (원/Kg)
  const calculateUnitPrice = (silverContent: number, isRolled: boolean): number => {
    if (!silverContent) return 0;
    // Use current silver price from database, fallback to 1745 if not available
    const referenceSilverPrice = silverPrice?.priceUsd || 1745;
    const basePrice = (referenceSilverPrice * silverContent / 100) * 1000; // Convert from g to Kg
    const additionalCost = isRolled ? 100000 : 70000; // Additional cost per Kg
    return Math.floor(basePrice + additionalCost); // Remove decimals
  };

  // Format unit price for display (no decimals)
  const formatUnitPrice = (price: number): string => {
    return Math.floor(price).toLocaleString();
  };

  // Parse string values from database to numbers for calculations
  const parseNumericString = (value: string | number): number => {
    if (typeof value === 'number') return value;
    return parseFloat(value) || 0;
  };

  // Watch for changes in edit form as well
  const editWatchedSilverContent = editForm.watch("silverContent");
  const editWatchedIsRolled = editForm.watch("isRolled");



  const createMutation = useMutation({
    mutationFn: (data: InventoryFormData) => apiRequest("POST", "/api/inventory", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      form.reset();
      setIsAdding(false);
      toast({
        title: "성공",
        description: "재고 항목이 성공적으로 등록되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "오류",
        description: "재고 등록 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: InventoryFormData }) =>
      apiRequest("PUT", `/api/inventory/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      setEditingId(null);
      editForm.reset();
      toast({
        title: "성공",
        description: "재고 항목이 성공적으로 수정되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "오류",
        description: "재고 수정 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/inventory/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      toast({
        title: "성공",
        description: "재고 항목이 성공적으로 삭제되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "오류",
        description: "재고 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InventoryFormData) => {
    createMutation.mutate(data);
  };

  const onEdit = (data: InventoryFormData) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    }
  };

  const startEdit = (item: Inventory) => {
    setEditingId(item.id);
    editForm.reset({
      itemName: item.itemName,
      silverContent: item.silverContent,
      specification: item.specification,
      isRolled: item.isRolled,
      quantityGrams: parseNumericString(item.quantityGrams),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    editForm.reset();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleAdminPanelToggle = () => {
    if (!isAuthenticated) {
      setShowPasswordDialog(true);
    } else {
      setShowAdminPanel(!showAdminPanel);
    }
  };

  const handlePasswordSubmit = () => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "w1177155"; // 관리자 패스워드
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      setShowAdminPanel(true);
      setShowPasswordDialog(false);
      setPasswordInput("");
      toast({
        title: "인증 성공",
        description: "관리자 패널에 접근할 수 있습니다.",
      });
    } else {
      toast({
        title: "인증 실패",
        description: "잘못된 패스워드입니다.",
        variant: "destructive",
      });
      setPasswordInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>홈으로 돌아가기</span>
            </Link>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">다바로</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">제품재고</h1>
          <p className="text-lg text-gray-600">
            현재 보유 중인 제품 재고 현황
          </p>
        </div>

        {/* Admin Panel Toggle */}
        <div className="mb-6 text-center">
          <Button
            onClick={handleAdminPanelToggle}
            variant="outline"
            className="mb-4"
          >
            {showAdminPanel ? "관리자 패널 숨기기" : "관리자 패널 열기"}
          </Button>
        </div>

        {/* Password Dialog */}
        {showPasswordDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">관리자 인증</h3>
              <p className="text-sm text-gray-600 mb-4">
                관리자 패널에 접근하려면 패스워드를 입력하세요.
              </p>
              <Input
                type="password"
                placeholder="패스워드 입력"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                className="mb-4"
              />
              <div className="flex space-x-2">
                <Button onClick={handlePasswordSubmit} className="flex-1">
                  확인
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowPasswordDialog(false);
                    setPasswordInput("");
                  }}
                  className="flex-1"
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Panel */}
        {showAdminPanel && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                재고 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isAdding ? (
                <Button onClick={() => setIsAdding(true)} className="mb-4">
                  <Plus className="w-4 h-4 mr-2" />
                  새 재고 추가
                </Button>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div>
                      <Label htmlFor="itemName">품목</Label>
                      <Input
                        id="itemName"
                        {...form.register("itemName")}
                        placeholder="품목명을 입력하세요"
                      />
                      {form.formState.errors.itemName && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.itemName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="silverContent">은함량(%)</Label>
                      <Input
                        id="silverContent"
                        type="number"
                        min="1"
                        max="100"
                        {...form.register("silverContent", { valueAsNumber: true })}
                        placeholder="은함량을 입력하세요"
                      />
                      {form.formState.errors.silverContent && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.silverContent.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="specification">규격</Label>
                      <Input
                        id="specification"
                        {...form.register("specification")}
                        placeholder="규격을 입력하세요"
                      />
                      {form.formState.errors.specification && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.specification.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center space-x-2 mt-6">
                        <Checkbox
                          id="isRolled"
                          checked={form.watch("isRolled")}
                          onCheckedChange={(checked) => form.setValue("isRolled", !!checked)}
                        />
                        <Label htmlFor="isRolled" className="text-sm">
                          압연재
                        </Label>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="quantityGrams">수량(Kg)</Label>
                      <Input
                        id="quantityGrams"
                        type="number"
                        step="0.1"
                        {...form.register("quantityGrams", { valueAsNumber: true })}
                        placeholder="수량을 입력하세요"
                      />
                      {form.formState.errors.quantityGrams && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.quantityGrams.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="unitPrice">단가(원/Kg)</Label>
                      <Input
                        id="unitPrice"
                        type="text"
                        value={formatUnitPrice(calculateUnitPrice(watchedSilverContent, watchedIsRolled))}
                        placeholder="자동 계산됩니다"
                        readOnly
                        className="bg-gray-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        기준 은 고시가: ₩1,745/g
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {createMutation.isPending ? "저장 중..." : "저장"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAdding(false);
                        form.reset();
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      취소
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>재고 현황</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">재고 정보를 불러오는 중...</p>
              </div>
            ) : inventory && inventory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        품목
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        은함량(%)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        규격
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        수량(Kg)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        단가(원/Kg)
                      </th>
                      {showAdminPanel && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          관리
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventory
                      .sort((a, b) => {
                        // First sort by itemName (descending)
                        const itemCompare = b.itemName.localeCompare(a.itemName);
                        if (itemCompare !== 0) return itemCompare;
                        // Then sort by specification (descending)
                        return b.specification.localeCompare(a.specification);
                      })
                      .map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        {editingId === item.id ? (
                          <>
                            <td className="px-6 py-4">
                              <Input
                                {...editForm.register("itemName")}
                                className="w-full"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <Input
                                type="number"
                                min="1"
                                max="100"
                                {...editForm.register("silverContent", { valueAsNumber: true })}
                                className="w-full"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <Input
                                {...editForm.register("specification")}
                                className="w-full"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <Input
                                type="number"
                                {...editForm.register("quantityGrams", { valueAsNumber: true })}
                                className="w-full"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <Input
                                type="text"
                                value={formatUnitPrice(calculateUnitPrice(editWatchedSilverContent, editWatchedIsRolled))}
                                className="w-full bg-gray-100"
                                readOnly
                              />
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={editForm.handleSubmit(onEdit)}
                                  disabled={updateMutation.isPending}
                                >
                                  <Save className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={cancelEdit}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.itemName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.silverContent}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.specification}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {parseNumericString(item.quantityGrams)} Kg
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ₩{formatUnitPrice(calculateUnitPrice(item.silverContent, item.isRolled))}
                            </td>
                            {showAdminPanel && (
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => startEdit(item)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => deleteMutation.mutate(item.id)}
                                    disabled={deleteMutation.isPending}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            )}
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">재고 없음</h3>
                <p className="mt-2 text-gray-500">
                  현재 등록된 재고가 없습니다.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200 text-right text-sm text-gray-500 space-y-2">
              <p>※ 부가세 별도 금액입니다.</p>
              <p>※ 실제 재고 및 출고 가능 여부는 담당자와의 확인을 통해 안내받으시기 바랍니다.</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA Section */}
        <Card className="mt-8">
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">재고 관련 문의</h3>
              <p className="text-gray-600 mb-6">
                현재 재고 현황 및 출고 가능 여부를 정확히 안내해 드립니다.
              </p>
              <p className="text-gray-800 font-semibold">
                담당자 직통: <a 
                  href="tel:010-6231-9752"
                  className="text-green-600 hover:text-green-700 transition-colors underline"
                >
                  010-6231-9752
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}