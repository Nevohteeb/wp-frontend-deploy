import axios from 'axios';
const baseUrl = import.meta.env.VITE_WP_BASEURL

// our exported add to cart function

const AddToCart = (productId, responseReceived, notificationMessage, buttonStatus) => {
    // console.log("clicked add to cart")
    // console.log(added);
    // Test the co-cart is plugged in and working
    // Run a GET  to the following endpoint:
    // ​http://localhost:8888/wordpress-api/wp-json/cocart/v2/store

    // make the product ID a string so it can be interpreted by the coCart API
    // (id and quantity properties are strings) - see https://docs.cocart.xyz/?javascript--node#add-to-cart-clear-cart-parameters
    const idString = productId.toString();
    buttonStatus("Adding to cart...")
    // Update cart with new item
    const updateCart = (endpoint) => {
        // console.log("end point" + endpoint);
        axios.post(endpoint, {
            id: idString,
            quantity: "1"
        })
            .then((response) => {
                // console.log(response)
                responseReceived(true)
                buttonStatus("Add to cart")
                notificationMessage("Successfully added to cart!")
                // set the cart key
                const uniqueCartKey = response.data.cart_key;
                const itemCount = response.data.item_count;
                localStorage.setItem('cartKey', uniqueCartKey)
                localStorage.setItem('itemCount', itemCount)
            })
            .catch((error) => {
                console.log(error);
                responseReceived(true)
                notificationMessage("Sorry there was a problem. Please try again later.")
            });
    }

    // check if a cart already exists
    // if so, post to the unique cart based on the current cart_key

    if (localStorage.cartKey) {
        const cartEndpoint = `${baseUrl}/wp-json/cocart/v2/cart/add-item/?cart_key=${localStorage.cartKey}`
        updateCart(cartEndpoint)
    } else {
        const cartEndpoint = `${baseUrl}/wp-json/cocart/v2/cart/add-item`
        updateCart(cartEndpoint)
    }

}

export default AddToCart;