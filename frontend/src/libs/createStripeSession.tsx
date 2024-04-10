export default async function createStripeSession() {
      const response = await fetch("http://localhost:5000/api/v1/stripe/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            product: "tempProduct"
            
            
        
        })
      })
  
      const session = await response.json();
  
  
}