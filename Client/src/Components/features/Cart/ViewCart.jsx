import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewCart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.currentUser);
    const [cartItems, setCartItems] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("user.id:", user?.id);

        try {
            const response = await axios.get(`/api/cart/${user.id}`)
            const dataFromServer = response.data
            setCartItems(dataFromServer);
            alert('ההעגלה נטענה בהצלחה!')

           // navigate(-1)
        } catch (err) {
            console.error("שגיאה:", err);

            if (err.response) {
                alert(`שגיאה בשרת: ${err.response.status} - ${err.response.data}`);
            } else if (err.request) {
                alert("אין תגובה מהשרת. בדקי אם השרת רץ.");
            } else {
                alert("שגיאה בבקשה: " + err.message);
            }
        }

        // } catch (err) {
        //     if (err.response && err.response.status === 400) {
        //         alert('שגיאה בהוספת מוצר')
        //     } else {
        //         alert('אירעה שגיאה בהוספת המוצר')
        //     }
        // }
    }
const getProduct=async(e)=>{
     e.preventDefault()
}

    return (
        <>
        <div>
            <button onClick={handleSubmit}>פתח סל קניות</button>
        </div>
        
        <ul>
  {cartItems.map((item, index) => (
    <li key={index}>{item.productName} - {item.price} ש"ח</li>
  ))}
</ul>
</>
    );


}
