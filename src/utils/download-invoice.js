import axios from "axios";
import { server } from "../server";

export const downloadInvoice = async (orderId, invoiceData) => {
    console.log("ordreId--", orderId)
    console.log("invoiceData--", invoiceData)
    try {
        const response = await axios.post(
            `${server}/order/generate-invoice`,
            {orderId, invoiceData},
            {
                responseType: 'blob', // Important to handle binary data
            }
        );

        // Create a Blob URL and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invoice.pdf'); // File name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error('Error downloading invoice:', error);
    }
};