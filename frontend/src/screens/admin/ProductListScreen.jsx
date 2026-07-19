import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import Meta from '../../components/Meta';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { formatINR } from '../../utils/formatters';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Delete this product? This cannot be undone.')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className='container page'>
      <Meta title='Products — Nargis admin' />
      <div className='page-title-row'>
        <h1>Products</h1>
        <Link to='/admin/product/create' className='btn'>
          <FaPlus /> Add product
        </Link>
      </div>

      {loadingDelete && <Loader small />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className='table-wrap'>
            <table className='table'>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Craft house</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image}
                        alt=''
                        className='table-thumb'
                      />
                    </td>
                    <td>
                      {product.name}
                      <div className='cell-mono'>{product._id.slice(-8)}</div>
                    </td>
                    <td>{formatINR(product.price)}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      {product.countInStock === 0 ? (
                        <span className='badge badge--no'>Out</span>
                      ) : product.countInStock <= 5 ? (
                        <span className='badge badge--warn'>
                          {product.countInStock} left
                        </span>
                      ) : (
                        product.countInStock
                      )}
                    </td>
                    <td>
                      {product.rating} ★ ({product.numReviews})
                    </td>
                    <td>
                      <div className='table__actions'>
                        <Link
                          to={`/admin/product/${product._id}/edit`}
                          className='btn btn--ghost btn--sm btn--icon'
                          aria-label={`Edit ${product.name}`}
                        >
                          <FaEdit />
                        </Link>
                        <button
                          type='button'
                          className='btn btn--danger btn--sm btn--icon'
                          aria-label={`Delete ${product.name}`}
                          onClick={() => deleteHandler(product._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
