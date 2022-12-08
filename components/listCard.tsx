import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { IList } from "../utils/interfaces";

type ListProps = {
  //list: { _id: number; title: string };
  list: IList;
};

export default function listCard({ list }: ListProps) {
  return (
    <>
      <Card
        id={list.title}
        elevation={8}
        sx={{ maxWidth: 400, borderRadius: "10px" }}
      >
        <Link
          href={{
            pathname: `/list/${list._id}`,
          }}
        >
          <CardActionArea>
            <CardContent>
              <Box
                sx={{
                  height: 150,
                }}
              >
                <Typography variant="h5" component="div">
                  {list.title}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </>
  );
}
