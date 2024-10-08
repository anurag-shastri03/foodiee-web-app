export class OrderService {
    static orderUrl = 'http://localhost:5000/api/myOrderData';

    static async fetchMyOrder(payload){
        try{
            const response = await fetch(this.orderUrl, {
                // credentials: 'include',
                // Origin:"http://localhost:3000/login",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              })
              if(!response.ok) {
                throw new Error('Failed to fetch orders');
              }
              const data = await response.json();
              return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}