import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import Meta from '../../components/Meta';
import {
  useGetProductDetailsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

// Handles both /admin/product/create (no id) and /admin/product/:id/edit.
const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const isCreating = !productId;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId, { skip: isCreating });

  const { data: categories } = useGetCategoriesQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  // Fill the form once the record arrives from the API. setState-in-effect is
  // the pragmatic option here: the data is async and the fields stay editable
  // afterwards, so it can't be derived during render.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const submitHandler = async (e) => {
    e.preventDefault();
    const fields = {
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock,
    };
    try {
      if (isCreating) {
        await createProduct(fields).unwrap();
        toast.success('Product created');
      } else {
        await updateProduct({ productId, ...fields }).unwrap();
        toast.success('Product updated');
        refetch();
      }
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const saving = loadingCreate || loadingUpdate;

  return (
    <div className='container page'>
      <Meta
        title={
          isCreating ? 'Add product — Nargis admin' : 'Edit product — Nargis admin'
        }
      />
      <Link to='/admin/productlist' className='back-link'>
        <FaArrowLeft /> Back to products
      </Link>

      <FormContainer>
        <h1>{isCreating ? 'Add product' : 'Edit product'}</h1>
        {saving && <Loader small />}

        {!isCreating && isLoading ? (
          <Loader />
        ) : !isCreating && error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className='field'>
              <label className='field__label' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                className='field__input'
                type='text'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='price'>
                Price (₹)
              </label>
              <input
                id='price'
                className='field__input'
                type='number'
                min='0'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='image'>
                Image
              </label>
              <input
                id='image'
                className='field__input'
                type='text'
                placeholder='Uploads fill this in automatically'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                className='field__input'
                style={{ marginTop: '0.5rem' }}
                type='file'
                accept='image/*'
                onChange={uploadFileHandler}
              />
              {loadingUpload && <Loader small />}
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='brand'>
                Craft house
              </label>
              <input
                id='brand'
                className='field__input'
                type='text'
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='countInStock'>
                Count in stock
              </label>
              <input
                id='countInStock'
                className='field__input'
                type='number'
                min='0'
                required
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='category'>
                Category
              </label>
              <input
                id='category'
                className='field__input'
                type='text'
                required
                list='category-options'
                placeholder='Pick an existing category or type a new one'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <datalist id='category-options'>
                {(categories || []).map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='description'>
                Description
              </label>
              <textarea
                id='description'
                className='field__input'
                rows='4'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button type='submit' className='btn btn--block' disabled={saving}>
              {isCreating ? 'Create product' : 'Save changes'}
            </button>
          </form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
