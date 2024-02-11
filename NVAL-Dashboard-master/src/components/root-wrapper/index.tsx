import AddIcon from "@mui/icons-material/Add";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Title } from "react-admin";
import * as React from "react";

type RootWrapperProps = {
  title: string;
  children: React.ReactNode;
  pageHeader?: string;
  pageHeaderIcon?: React.ReactNode;
  fullwidthContent?: boolean;
  [name: string]: any;
};

const RootWrapper = ({
  title,
  pageHeader,
  children,
  pageHeaderIcon = <AddIcon />,
  fullwidthContent = false,
  ...props
}: RootWrapperProps) => {
  return (
    <>
      <Title title={title} />
      <Card
        elevation={8}
        sx={{
          margin: 3,
          border: "none",
          borderRadius: 2,
          background: "#FEFEFE",
          ...props.sx,
        }}
      >
        {pageHeader && (
          <Box sx={{ margin: 0 }}>
            <Typography
              sx={{
                backgroundColor: "primary.main",
                px: 4,
                py: 1.2,
                display: "inline-block",
                borderRadius: (theme) => `0 0 ${theme.spacing(2)} 0`,
                boxShadow: `1px 1px 1px 2px #dadada, 2px 2px 2px 2px #ffffff,
                3px 3px 3px 2px #eeeeee`,
                color: "#EFEFFF",
                fontWeight: 600,
                lineHeight: 1.2,
                textTransform: "capitalize",
              }}
              variant="h5"
              component="h5"
              align="left"
            >
              {pageHeader}
            </Typography>
          </Box>
        )}
        <CardContent
          sx={{
            marginX: fullwidthContent ? 0 : 2,
            marginBottom: 0.5,
            marginTop: 0.5,
            paddingX: fullwidthContent ? 0 : 2,
          }}
        >
          <Box>{children}</Box>
        </CardContent>
      </Card>
    </>
  );
};

export default RootWrapper;
