import React from "react";
import { Route } from "react-router-dom";
import { Button } from "antd";

export const UserLoginTemplate = (propsRoute) => {
  let { Component, ...restRoute } = propsRoute;

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Button></Button>
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
};
