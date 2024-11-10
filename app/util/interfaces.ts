export interface Books {
    data: [
    {  id: number,
      image: string,
      category_id: 11,
      title: string,
      author: string,
      available_copies: number,
      price: number,
      booking_price: number,
      is_active: number,
      isbn: number,
      deleted_at: Date | null,
      created_at: Date | null,
      updated_at: Date | null,
      category: {
        id: number;
        name: string;
      }}];
    pagination: {
    total: number,
    per_page: number,
    current_page: number,
    total_pages: number
  }
  }