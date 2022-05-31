import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleLoading } from "../features/common.slice";
import { useLogoutLazyQuery } from "../generated/graphql";

const Dashboard = () => {
  const router = useRouter();
  const [logoutQuery] = useLogoutLazyQuery();

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      dispatch(toggleLoading());
      const { data: logoutData, error: logoutError } = await logoutQuery();
      dispatch(toggleLoading());

      if (logoutError !== undefined) {
        toast.error(logoutError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return false;
      }

      if (logoutData === undefined || logoutData.logout === false) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return false;
      }

      localStorage.clear();
      router.replace("/login");
    } catch (error: any) {
      if (error) {
        toast.error(error.toString(), {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return false;
      }
    }
  };
  return <div onClick={logoutHandler}>Logout</div>;
};

export default Dashboard;
