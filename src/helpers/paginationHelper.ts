type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

/**
 * Calculate pagination options from given input options.
 *
 * @param {IOptions} options - Pagination options.
 * @property {number} [options.page=1] - Page number.
 * @property {number} [options.limit=10] - Number of items per page.
 * @property {string} [options.sortBy='createdAt'] - Field name to sort by.
 * @property {string} [options.sortOrder='desc'] - Sort order.
 * @returns {IOptionsResult} - Calculated pagination options.
 */
const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
