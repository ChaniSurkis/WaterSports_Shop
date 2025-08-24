import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "./productSlice"

function ViewAllProducts()
{
    let dis = useDispatch()
    let list = useSelector(p=>p.productReducer.listProducts)
    useEffect(() => {
      
        getProducts()
    }, [])

    const getProducts = async () => {

        dis(getAllProducts())

    }
    console.log(list);
    return(
        <>
        <div>
            <h1>products:</h1>
            {   list.map( item=>
                <div style={{ border: "2px solid green" }}>
                   <h2>{item.name}</h2>
                   <h2>{item.description}</h2>
                   <h2>{item.price}</h2>
                </div>)}

        </div>
        </>
    )

}
export default ViewAllProducts