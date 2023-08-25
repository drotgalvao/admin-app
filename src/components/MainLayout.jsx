import React, { useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { Outlet, Link } from "react-router-dom";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBloggerB, FaClipboardList } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">VTX</span>
            <span className="lg-logo">Vetuxe</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Painel de Controle",
            },
            {
              key: "clientes",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Clientes",
            },
            {
              key: "catalogo",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalogo",
              children: [
                {
                  key: "produto",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Adicionar Produto",
                },
                {
                  key: "produto-lista",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Lista de Produtos",
                },
                {
                  key: "marca",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Adicionar Marca",
                },
                {
                  key: "marca-lista",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Lista de Marcas",
                },
                {
                  key: "categoria",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Adicionar Categoria",
                },
                {
                  key: "categoria-lista",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Lista de Categorias",
                },
                {
                  key: "cor",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Adicionar Cor",
                },
                {
                  key: "cor-lista",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Lista de Cores",
                },
              ],
            },
            {
              key: "pedidos",
              icon: <FaClipboardList className="fs-4" />,
              label: "Pedidos",
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Adicionar Blog",
                },
                {
                  key: "blog-lista",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Lista de Blogs",
                },
                {
                  key: "blog-categoria",
                  icon: <ImBlog className="fs-4" />,
                  label: "Adicionar Categoria de Blog",
                },
                {
                  key: "blog-categoria-lista",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Lista de Categorias de Blog",
                },
              ],
            },
            {
              key: "perguntas",
              icon: <FaClipboardList className="fs-4" />,
              label: "Perguntas",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Diego</h5>
                <p className="mb-0">diegohenriquegalvao@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li className="">
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Ver Perfil
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Sair
                  </Link>
                </li>

              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
