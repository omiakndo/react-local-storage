import React, { useEffect, useState } from 'react';
import './Item.css'

const Item = () => {
    const [items ,setItems] = useState([])
    useEffect( ()=>{
        fetch('data.json')
        .then(res => res.json())
        .then(data =>setItems(data))
    },[])

    const reducer =(pre,cur) =>pre + cur.age;
    const total = items.reduce(reducer,0)

    return (
        <div>
            <h1>All Product Here</h1>
            <p>Total Price: {total}</p>
            {
                items.map(item =><DisplayItems key={item._id} items={item}></DisplayItems>)
            }
            
        </div>
    );
};

const DisplayItems =(props)=>{
    const{company , email , _id } =props.items

    
//  add cart to local storage
    const cartButton =(_id) =>{

        let shoppingCart;

        const storedCart = localStorage.getItem('shopping-cart')

        if(storedCart){
           shoppingCart= JSON.parse(storedCart)
        }
        else{
            shoppingCart ={}
        }
      
        
        const quantity = shoppingCart[_id]
        if(quantity){
        const newQuantity =  quantity +1;
        shoppingCart[_id] = newQuantity
        // localStorage.setItem(_id , newQuantity)
        }
        else{
            shoppingCart[_id] =1;
            // localStorage.setItem(_id , 1)
        }
     
        localStorage.setItem('shopping-cart' , JSON.stringify(shoppingCart))
    }


    // Remove cart the local storage
    const removeCart =_id =>{
        

        const storedCart = localStorage.getItem('shopping-cart')
        if(storedCart){
            const shoppingCart = JSON.parse(storedCart)
            if(_id in shoppingCart){
               delete shoppingCart[_id];
               localStorage.setItem('shopping-cart' , JSON.stringify(shoppingCart))
            }
        }
    }
    return(
        <div className='item'>

            <h1>Name: {company} </h1>
            <h2>Email: {email}</h2>
            <p>Id ={_id}</p>
            
            <button onClick={()=>cartButton(_id)}>Add Cart</button>
            <button onClick={()=>removeCart(_id)}>Remove Cart</button>
        </div>
    )
}
export default Item;