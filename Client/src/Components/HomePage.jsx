import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { getAllProducts } from "./features/products/productSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.productReducer.listProducts);
  const userStatus = useSelector((state) => state.userReducer.status);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // שימוש ב useMemo לייצוב מערך התמונות
  const images = useMemo(() => {
    return products
      .filter((p) => p.image && p.image.trim() !== "")
      .map((p, index) => ({
        id: p._id || index,
        image: p.image,
      }));
  }, [products]);

  // פונקציה לבחירת 3 תמונות רנדומליות שונות בתחילה
  const getRandomInitialImages = () => {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [carouselImages, setCarouselImages] = useState([]);

  // אתחול הקרוסלה כשהתמונות מוכנות
  useEffect(() => {
    if (images.length >= 3) {
      setCarouselImages(getRandomInitialImages());
    }
  }, [images]);

  // הפעלת אינטרוול פעם אחת בלבד - תלוי ב images בלבד
  useEffect(() => {
    if (images.length < 4) return; // צריך לפחות 4 תמונות כדי להחליף

    console.log("Setting interval"); // לבדיקה שהאינטרוול נוצר פעם אחת

    const interval = setInterval(() => {
      setCarouselImages((prev) => {
        // בוחרים תמונה חדשה שלא נמצאת כרגע
        const currentIds = prev.map((img) => img.id);
        const available = images.filter((img) => !currentIds.includes(img.id));

        if (available.length === 0) return prev; // אין תמונות חדשות, לא משנה

        const newImage = available[Math.floor(Math.random() * available.length)];

        // מסירים את התמונה הראשונה ומוסיפים חדשה בסוף
        return [...prev.slice(1), newImage];
      });
    }, 3000); // החלפה כל 40 שניות (בדוגמה שלך זה 40,000 מילישניות)

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <Header currentUserStatus={userStatus} />

      <div
        style={{
          paddingTop: "70px",
          direction: "rtl",
          fontFamily: "Arial",
          minHeight: "600px",
          backgroundImage: "url('/sea.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.50)", // <<< השקיפות
            padding: "40px 0",
          }}
        >
          {/* קרוסלת תמונות */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              alignItems: "center",
              transition: "all 0.5s ease-in-out",
            }}
          >
            {carouselImages.map(({ id, image }) => (
              <img
                key={id}
                src={`/images/${image}`}
                alt={`product-${id}`}
                style={{
                  width: "300px",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  transition: "transform 0.5s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}






