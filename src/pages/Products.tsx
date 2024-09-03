import ProductCard from '@/components/ProductCard';
import { useToast } from '@/components/ui/use-toast';
import { useGetProductsQuery } from '@/redux/features/productApi';
import { IProduct } from '@/types/globalTypes';

export default function Products() {
  const { data: products, isLoading, error } = useGetProductsQuery(undefined);
  const { toast } = useToast();
  console.log(products);
  // Handling loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center flex-wrap space-x-5 max-w-7xl mx-auto relative ">
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {products?.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
