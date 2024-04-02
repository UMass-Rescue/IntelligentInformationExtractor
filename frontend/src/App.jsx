// import './App.css';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import SignupPage from './pages/Signup';
// import LoginPage from './pages/Login';
// import DashboardPage from './pages/Dashboard';

// function App() {
//   return (
//     <div>
//     <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//     <div className="max-w-md w-full space-y-8">
//      <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<LoginPage/>} />
//             <Route path="/signup" element={<SignupPage/>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   </div>
//   <BrowserRouter>
//         <Routes>
//             <Route path="/dashboard" element={<DashboardPage/>} />
//         </Routes>
//       </BrowserRouter>
//   </div>
//   );
// }

// export default App;

import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPageLayout />} />
        <Route path="/signup" element={<SignupLayout />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function LoginPageLayout() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

function SignupLayout() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Routes>
          <Route path="/" element={<SignupPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

