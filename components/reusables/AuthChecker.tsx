import Router from "next/router";
import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../features/common.slice";
import { setDashboardUser } from "../../features/dashboard.sice";
import { useMeLazyQuery, User } from "../../generated/graphql";

interface AuthCheckerProps {
  children: ReactElement;
  page?: "survey" | "profile" | "dashboard";
}

const AuthChecker = ({ children, page }: AuthCheckerProps) => {
  const dispatch = useDispatch();
  const [meQuery, { loading: queryLoading }] = useMeLazyQuery();

  useEffect(() => {
    const myFunc = async () => {
      try {
        dispatch(toggleLoading());
        const { data } = await meQuery();
        dispatch(toggleLoading());

        // not logged in
        if (!data) {
          Router.replace("/login");
          return;
        }

        if (data?.user) {
          // profile page
          if (
            page === "profile" &&
            data.user.isProfileCompleted &&
            data.user.isSurveyCompleted
          ) {
            Router.replace("/dashboard?page=explore");
            return;
          }

          // survey page
          if (page === "survey" && data.user.isSurveyCompleted) {
            Router.replace(
              data.user.type === "employee"
                ? "/employee-profile?page=location"
                : "/employer-profile?page=location"
            );
            return;
          }
          // dashboard page
          if (page === "dashboard" && !data.user.isProfileCompleted) {
            Router.replace(
              data.user.type === "employee"
                ? "/employee-profile?page=location"
                : "/employee-profile?page=location"
            );
            return;
          }

          if (page === "dashboard" && data.user.isProfileCompleted) {
            const user: User = {
              _id: data.user._id,
              email: data.user.email,
              firstName: data.user.firstName,
              isAccountVerified: data.user.isAccountVerified,
              isProfileCompleted: data.user.isProfileCompleted,
              isSurveyCompleted: data.user.isSurveyCompleted,
              lastName: data.user.lastName,
              number: data.user.number,
              type: data.user.type,
              createdAt: undefined,
              updatedAt: undefined,
            };

            dispatch(setDashboardUser(user));
            return;
          }
        }
      } catch (error) {
        Router.replace("/login");
        return;
      }
    };
    myFunc();
    // eslint-disable-next-line
  }, [dispatch]);

  if (queryLoading) return null;

  return children;
};

export default AuthChecker;
