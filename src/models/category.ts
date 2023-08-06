export type AllCategoryUrlParams = {
  page: number;
  take: number;
  search: string;
};

export interface AllCategoryResponse {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  name: string;
}

export interface AddCategoryResponse {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ModifyCategoryData extends Category {
  categoryId: string;
}

export interface ModifyBtnProps {
  data: ModifyCategoryData;
  triggerAction: () => void;
}
