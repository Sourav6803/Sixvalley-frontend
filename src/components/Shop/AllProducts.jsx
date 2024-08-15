// import { Button } from "@material-ui/core";
import Button from '@mui/material/Button'
import { DataGrid } from "@material-ui/data-grid";

import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";


const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state?.products);


  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      border: 'red',
      flex: 0.7
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1.4,
      border: 'red',
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 120,
      flex: 0.4,

    },
    {
      field: "Stock",
      headerName: "Stock",
      // type: "number",
      // minWidth: 150,
      flex: 0.5,
      type: 'number',
      minWidth: 130,
    },

    {
      field: "sold",
      headerName: "Sold_out",
      type: "number",
      minWidth: 180,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 160,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products?.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "₹" + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="w-full mx-2 pt-1 mt-5 bg-gray-200">


          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;