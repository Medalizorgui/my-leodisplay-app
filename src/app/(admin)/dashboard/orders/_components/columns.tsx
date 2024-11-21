import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, DeleteIcon, MoreHorizontal } from "lucide-react";
import UpdateOrder from "./update";
import DeleteOrder from "./delete";

export const columns: ColumnDef<Order>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "orderGroupId",  // New Column for Order Group ID
      header: "Order Group ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("orderGroupId")}</div>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="lowercase">
          <img src={row.getValue("image")} alt="Product Image" style={{ width: '50px', height: '50px' }} />
        </div>
      ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("email")}</div>
        ),
    },
    {
      accessorKey: "productNom",
      header: "Product Nom",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("productNom")}</div>
      ),
    },
    {
      accessorKey: "selectedBarre",
      header: "Selected Barre",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("selectedBarre")}</div>
      ),
    },
    {
      accessorKey: "selectedTaille",
      header: "Selected Taille",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("selectedTaille")}</div>
      ),
    },
    {
      accessorKey: "selectedBase",
      header: "Selected Base",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("selectedBase")}</div>
      ),
    },
    {
      accessorKey: "selectedType",
      header: "Selected Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("selectedType")}</div>
      ),
    },
    {
      accessorKey: "qty",
      header: "Qty",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("qty")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        const orderId = payment.id.toString();
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DeleteOrder orderId={orderId}/>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UpdateOrder order={payment}/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
