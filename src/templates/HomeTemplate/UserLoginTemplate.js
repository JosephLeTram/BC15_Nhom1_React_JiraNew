import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Button, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  });

  let { Component, ...restRoute } = props;

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Layout>
              <Sider
                width={size.width / 2}
                style={{
                  height: size.height,
                  backgroundImage: "url(https://picsum.photos/500)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100%",
                  backgroundPosition: "center",
                }}
              ></Sider>
              <Content>
                <Component {...propsRoute} />
              </Content>
            </Layout>
          </>
        );
      }}
    />
  );
};
