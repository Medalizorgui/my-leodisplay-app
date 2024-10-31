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

export const columns: ColumnDef<Product>[] = [
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
        <div className="text-right font-medium">{row.getValue("prix")}</div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
        const values = row.getValue("type") as string[]; // Cast the value to string[]
        return (
            <div className="flex flex-wrap gap-2">
                {values.map((item, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {item}
                    </span>
                ))}
            </div>
      );
    },
  },
  {
    accessorKey: "base",
    header: "Base",
    cell: ({ row }) => {
        const values = row.getValue("base") as string[]; // Cast the value to string[]
        return (
            <div className="flex flex-wrap gap-2">
                {values.map((item, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {item}
                    </span>
                ))}
            </div>
        );
    },
},
{
  accessorKey: "taille",
  header: "Taille",
  cell: ({ row }) => {
      const values = row.getValue("taille") as string[]; // Cast the value to string[]
      return (
          <div className="flex flex-wrap gap-2">
              {values.map((item, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item}
                  </span>
              ))}
          </div>
      );
  },
},
{
  accessorKey: "barre",
  header: "Barre",
  cell: ({ row }) => {
      const values = row.getValue("type") as string[]; // Cast the value to string[]
      return (
          <div className="flex flex-wrap gap-2">
              {values.map((item, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
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
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
