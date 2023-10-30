import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const login = localStorage.getItem('login');

const getElement = (element: any) => {
  return true ? element : <Navigate to="/" replace />;
};

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards
const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications
const ManageOrder = Loader(
  lazy(() => import('src/content/pages/Main/Management/Transactions/index'))
);
const ManageProduct = Loader(
    lazy(() => import('src/content/pages/Main/Management/Products/index'))
);

const ManageProductDetail = Loader(
    lazy(() => import('src/content/pages/Main/Management/Products/Details/index'))
)

const ManageUser = Loader(
    lazy(() => import('src/content/pages/Main/Management/Users/index'))
)

const ManageBlog = Loader(
    lazy(() => import('src/content/pages/Main/Management/Blogs/index'))
)

const ManageBlogDetail = Loader(
    lazy(() => import('src/content/pages/Main/Management/Blogs/BlogDetail/index'))
)

const ManageDiscount = Loader(
    lazy(() => import('src/content/pages/Main/Management/Discounts/index'))
)

const ManageDiscountDetail = Loader(
    lazy(() => import('src/content/pages/Main/Management/Discounts/DiscountDetail/index'))
)


const Login = Loader(
  lazy(() => import('src/content/pages/Main/Account/Login'))
);
const Logout = Loader(
  lazy(() => import('src/content/pages/Main/Account/Logout'))
);
const Info = Loader(
  lazy(() => import('src/content/pages/Main/Account/Infomation'))
);

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: false ? (
          <Login />
        ) : (
          <Navigate to="/dashboards/overview" replace />
        )
      },
      {
        path: 'login',
        element: <Navigate to="/" replace />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="overview" replace />
      },
      {
        path: 'overview',
        element: getElement(<Crypto />)
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="product" replace />
      },
      {
        path: 'order',
        element: getElement(<ManageOrder />)
      },
      {
        path: 'product',
        element: getElement(<ManageProduct />)
      },
      {
        path: 'product/:id',
        element: getElement(<ManageProductDetail />)
      },
      {
        path: 'user',
        element: getElement(<ManageUser />)
      },
      {
        path: 'blog',
        element: getElement(<ManageBlog />)
      },
      {
        path: 'blog/create',
        element: getElement(<ManageBlogDetail />)
      },
      {
        path: 'discount',
        element: getElement(<ManageDiscount />)
      },
      {
        path: 'discount/create',
        element: getElement(<ManageDiscountDetail />)
      }
    ]
  },
  {
    path: 'account',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="infomation" replace />
      },
      {
        path: 'infomation',
        element: getElement(<Info />)
      },
      {
        path: 'logout',
        element: getElement(<Logout />)
      }
    ]
  }
];

export default routes;
