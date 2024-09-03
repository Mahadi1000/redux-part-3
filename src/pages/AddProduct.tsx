import { useAppDispatch } from '@/redux/hook';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAddProductMutation } from '@/redux/api/apiSlice';

interface IFormInput {
  name: string;
  image: string;
  price: number;
  features: string;
  rating: number;
  status: boolean;
}

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [addProduct, { isLoading, isSuccess, isError }] = useAddProductMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const newProduct = {
      ...data,
      features: data.features.split(','),
    };
    try {
      const result = await addProduct(newProduct).unwrap();
      console.log('Product added successfully:', result);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-5">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Form fields here */}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
        {isSuccess && <p className="text-green-500 text-xs mt-1">Product added successfully!</p>}
        {isError && <p className="text-red-500 text-xs mt-1">Failed to add product.</p>}
      </form>
    </div>
  );
};

export default AddProduct;
