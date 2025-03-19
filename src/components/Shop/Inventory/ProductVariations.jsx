// import { useState } from "react";
// import { Table, Input, Button } from "@/components/ui";
// import { Trash2, Plus } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";

// export default function UpdateVariations({ variations, attributes, onUpdate }) {
//   const [variantList, setVariantList] = useState(variations);

//   const handleInputChange = (id, key, value) => {
//     setVariantList((prev) =>
//       prev.map((variant) =>
//         variant._id === id ? { ...variant, [key]: value } : variant
//       )
//     );
//   };

//   const handleAttributeChange = (id, attrKey, value) => {
//     setVariantList((prev) =>
//       prev.map((variant) =>
//         variant._id === id
//           ? {
//               ...variant,
//               attributes: variant.attributes.map((attr) =>
//                 attr.key === attrKey ? { ...attr, value } : attr
//               ),
//             }
//           : variant
//       )
//     );
//   };

//   const addVariation = () => {
//     setVariantList((prev) => [
//       ...prev,
//       {
//         _id: uuidv4(),
//         sku: `SKU-${uuidv4().slice(0, 8)}`,
//         originalPrice: "",
//         discountType: "Flat",
//         discountAmount: "",
//         afterDiscountPrice: "",
//         stock: "",
//         sold_out: 0,
//         attributes: attributes.map((attr) => ({ key: attr, value: "" })),
//         images: [],
//       },
//     ]);
//   };

//   const removeVariation = (id) => {
//     setVariantList((prev) => prev.filter((variant) => variant._id !== id));
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between mb-3">
//         <h2 className="text-xl font-semibold">Update Variations</h2>
//         <Button onClick={addVariation} className="flex items-center">
//           <Plus size={16} className="mr-1" /> Add Variant
//         </Button>
//       </div>

//       <Table>
//         <thead>
//           <tr>
//             <th>SKU</th>
//             <th>Original Price</th>
//             <th>Discount Type</th>
//             <th>Discount Amount</th>
//             <th>After Discount Price</th>
//             <th>Stock</th>
//             {attributes.map((attr) => (
//               <th key={attr}>{attr}</th>
//             ))}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {variantList.map((variant) => (
//             <tr key={variant._id}>
//               <td><Input value={variant.sku} readOnly /></td>
//               <td><Input type="number" value={variant.originalPrice} onChange={(e) => handleInputChange(variant._id, "originalPrice", e.target.value)} /></td>
//               <td>
//                 <select
//                   value={variant.discountType}
//                   onChange={(e) => handleInputChange(variant._id, "discountType", e.target.value)}
//                 >
//                   <option value="Flat">Flat</option>
//                   <option value="Percent">Percent</option>
//                 </select>
//               </td>
//               <td><Input type="number" value={variant.discountAmount} onChange={(e) => handleInputChange(variant._id, "discountAmount", e.target.value)} /></td>
//               <td><Input type="number" value={variant.afterDiscountPrice} readOnly /></td>
//               <td><Input type="number" value={variant.stock} onChange={(e) => handleInputChange(variant._id, "stock", e.target.value)} /></td>
//               {variant.attributes.map((attr) => (
//                 <td key={attr.key}>
//                   <Input
//                     value={attr.value}
//                     onChange={(e) => handleAttributeChange(variant._id, attr.key, e.target.value)}
//                   />
//                 </td>
//               ))}
//               <td>
//                 <Button variant="destructive" onClick={() => removeVariation(variant._id)}>
//                   <Trash2 size={16} />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }



import { useState, useEffect } from "react";

const UpdateVariations = ({ product }) => {
  const [variations, setVariations] = useState(product.variants || []);
  const [attributeKeys, setAttributeKeys] = useState([]);

  console.log("product------>", product)

  useEffect(() => {
    // Extract unique attribute keys from product variations dynamically
    const keys = new Set();
    product?.variants?.forEach((variant) => {
      variant.attributes?.forEach(({ key }) => keys.add(key));
    });
    setAttributeKeys([...keys]);
  }, [product]);

  const handleInputChange = (index, field, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][field] = value;
    setVariations(updatedVariations);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Update Variations</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2">SKU</th>
            {attributeKeys.map((key) => (
              <th key={key} className="border border-gray-300 px-3 py-2">{key}</th>
            ))}
            <th className="border border-gray-300 px-3 py-2">Price</th>
            <th className="border border-gray-300 px-3 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {variations.map((variant, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 px-3 py-2">
                <input
                  type="text"
                  value={variant.sku}
                  onChange={(e) => handleInputChange(index, "sku", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </td>
              {attributeKeys.map((key) => (
                <td key={key} className="border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    value={
                      variant.attributes?.find((attr) => attr.key === key)?.value || ""
                    }
                    onChange={(e) => {
                      const newValue = e.target.value;
                      const updatedVariations = [...variations];
                      const attrIndex = updatedVariations[index].attributes.findIndex(
                        (attr) => attr.key === key
                      );
                      if (attrIndex !== -1) {
                        updatedVariations[index].attributes[attrIndex].value = newValue;
                      } else {
                        updatedVariations[index].attributes.push({ key, value: newValue });
                      }
                      setVariations(updatedVariations);
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
              ))}
              <td className="border border-gray-300 px-3 py-2">
                <input
                  type="number"
                  value={variant.originalPrice}
                  onChange={(e) => handleInputChange(index, "originalPrice", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 px-3 py-2">
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) => handleInputChange(index, "stock", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateVariations;

