import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Product } from "@prisma/client";
import DeleteProduct from "./delete";
import UpdateProduct from "./update";

type ExtendedProduct = Product & {
  bases: { name: string; image: string; price: number }[]; // Example of what base might look like
  tailles: {
    name: string;
    image: string;
    downloadLink: string;
    price: number;
  }[]; // Example of what taille might look like
};

export const columns: ColumnDef<ExtendedProduct>[] = [
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="lowercase">
        <img
          src={row.getValue("image")}
          alt="Product Image"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
    ),
  },
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nom")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "prix",
    header: () => <div className="text-right">Prix</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("prix")}TND</div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const values = row.getValue("type") as string[];
      return (
        <div className="flex flex-wrap gap-2">
          {values.map((item, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "bases",
    header: "Bases",
    cell: ({ row }) => {
      const bases = row.getValue("bases") as { name: string; image: string; price: number }[] ?? [];
      console.log("Bases data:", bases); // Log data to confirm it's correct
      return (
        <div className="flex flex-wrap gap-2">
          {bases.length > 0 ? (
            bases.map((base, index) => (
              <div key={index} className="flex items-center gap-2">
                <img src={base.image} alt={base.name} className="w-8 h-8 rounded" />
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{base.name} - {base.price}TND</span>
              </div>
            ))
          ) : (
            <span> </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "tailles",
    header: "Tailles",
    cell: ({ row }) => {
      const tailles = row.getValue("tailles") as { name: string; image: string; downloadLink: string; price: number }[] ?? [];
      console.log("Tailles data:", tailles); // Log data to confirm it's correct
      return (
        <div className="flex flex-wrap gap-2">
          {tailles.length > 0 ? (
            tailles.map((taille, index) => (
              <div key={index} className="flex items-center gap-2">
                <img src={taille.image} alt={taille.name} className="w-8 h-8 rounded" />
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{taille.name} - {taille.price}TND</span>
              </div>
            ))
          ) : (
            <span> </span>
          )}
        </div>
      );
    },
  },
  

  {
    accessorKey: "barre",
    header: "Barre",
    cell: ({ row }) => {
      const values = row.getValue("barre") as string[];
      return (
        <div className="flex flex-wrap gap-2">
          {values.map((item, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const productId = payment.id.toString();
      console.log("Bases:", payment.bases);
      console.log("Tailles:", payment.tailles);

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
              <DeleteProduct id={productId} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UpdateProduct product={payment} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
