import Banner from "@/components/Banner";
import FooterBan from "@/components/FooterBan";
import Product from "@/components/Product";
import { IB, IP } from "@/interfaces";
import { client } from "@/lib/client";
import { GetServerSideProps } from "next";
export default function Home ({products , banner} : {products : IP[] , banner : IB[]}) {
  return (
<>
{banner[0] && typeof banner[0] === 'object' && banner[0] !== null && (
  <Banner FirstB={banner[0] as IB} />
)}


<div className="products-heading">
<h2> best selling shit</h2> 

</div>
<div className="products-container">
  {products.map((product) => <Product key={product._id} product={product} />)}
</div>
<FooterBan b={banner && banner[0]} />
</>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
const query = '*[_type == "product"]'
const products = await  client.fetch(query)
const queryB = '*[_type == "banner"]'
const banner = await  client.fetch(queryB)
  return {
    props:{
      banner,
      products
    }
  }
}
