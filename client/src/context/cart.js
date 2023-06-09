import React, {useState, useContext, createContext, useEffect} from 'react'

const CartContext = createContext();

const CartProvider = ({children}) => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        const data = localStorage.getItem("cart");
        const parseDate = JSON.parse(data);

        if(parseDate){
            setCart(parseDate)
        }
        //eslint-disable-next-line
    }, [])

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

// custom hook
const useCart = () => useContext(CartContext);

export {useCart, CartProvider}