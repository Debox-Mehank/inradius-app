import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../components/profile/common/layout.component";
import { toggleLoading, addAllBenefits } from "../features/common.slice";
import {
  useAllBenefitsLazyQuery,
  useGetEmployerLazyQuery,
} from "../generated/graphql";
import {
  EmployerData,
  EMPLOYER_STEPS_ENUM,
  incrementProgress,
  incrementStep,
  setEmployerData,
} from "../features/employer.slice";
import EmployerCompanyVerification from "../components/profile/employer/employer.company-verification.component";
import EmployerCompanyDetails from "../components/profile/employer/employer.company-details.component";
import EmployerCompanyMiscellaneousInfo from "../components/profile/employer/employer.company-miscellaneous-info.component";

const EmployerProfile = () => {
  const router = useRouter();
  const { page } = router.query;

  const dispatch = useDispatch();

  const [getEmployerQuery] = useGetEmployerLazyQuery();
  const [allBenefitsQuery] = useAllBenefitsLazyQuery();

  // Fetch Masters
  useEffect(() => {
    const myFunc = async () => {
      dispatch(toggleLoading());

      // Fetch All Benefits
      const { data: allBenefits, error: allBenefitsError } =
        await allBenefitsQuery();

      if (allBenefitsError !== undefined) {
        toast.error(allBenefitsError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      if (allBenefits === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      const allBene = allBenefits.allBenefits.map((bene) => ({
        _id: bene._id,
        benefit: bene.benefit,
      }));
      dispatch(addAllBenefits(allBene));

      dispatch(toggleLoading());
    };
    myFunc();
  }, [allBenefitsQuery, dispatch]);

  // Fetch Stored Data on every refresh
  useEffect(() => {
    const myFunc = async () => {
      dispatch(toggleLoading());
      const { data: employerData, error: employerError } =
        await getEmployerQuery();
      if (employerError !== undefined) {
        toast.error(employerError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      if (employerData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      //   Store the data in slice
      const empData: EmployerData = {
        _id: employerData.getEmployer._id,
        companyName:
          employerData.getEmployer.companyName ??
          localStorage.getItem("companyName")!,
        companyImage: employerData.getEmployer.companyImage,
        companyLetterHead: employerData.getEmployer.companyLetterHead,
        employerVerifyStatus: employerData.getEmployer.employerVerifyStatus,
        employerVerified: employerData.getEmployer.employerVerified,
        linkedIn: employerData.getEmployer.linkedIn,
        gstNo: employerData.getEmployer.gstNo,
        panNo: employerData.getEmployer.panNo,
        registeredAddress: employerData.getEmployer.registeredAddress,
        currentAddress: employerData.getEmployer.currentAddress,
        noOfLocations: employerData.getEmployer.noOfLocations,
        landline: employerData.getEmployer.landline,
        noOfEmployees: employerData.getEmployer.noOfEmployees,
        lastTurnover: employerData.getEmployer.lastTurnover,
        noOfHiring: employerData.getEmployer.noOfHiring,
        attritionRate: employerData.getEmployer.attritionRate,
        benefits: employerData.getEmployer.benefits?.map((el) => ({
          label: el.benefit,
          value: el._id,
        })),
      };

      dispatch(setEmployerData(empData));
      dispatch(toggleLoading());

      // if (localStorage.getItem("showVerification")) {
      //   if (localStorage.getItem("showVerification") === "no") {
      //     dispatch(incrementStep());
      //     dispatch(incrementProgress());
      //     router.replace(
      //       "/employer-profile?page=" + EMPLOYER_STEPS_ENUM["employer-details"]
      //     );
      //     // return;
      //   }
      // }

      // // This is used to redirect user to start of the employee form
      // if (employerData.getEmployer.employerVerified) {
      //   dispatch(incrementStep());
      //   dispatch(incrementProgress());
      //   router.replace(
      //     "/employer-profile?page=" + EMPLOYER_STEPS_ENUM["employer-details"]
      //   );
      // } else {
      //   router.replace(
      //     "/employer-profile?page=" +
      //       EMPLOYER_STEPS_ENUM["employer-verification"]
      //   );
      // }
      router.replace(
        "/employer-profile?page=" + EMPLOYER_STEPS_ENUM["employer-verification"]
      );
    };
    myFunc();
    // eslint-disable-next-line
  }, [getEmployerQuery, dispatch]);

  return (
    <Layout>
      {page && page === EMPLOYER_STEPS_ENUM["employer-verification"] && (
        <EmployerCompanyVerification />
      )}
      {page && page === EMPLOYER_STEPS_ENUM["employer-details"] && (
        <EmployerCompanyDetails />
      )}
      {page && page === EMPLOYER_STEPS_ENUM["employer-miscellaneous-info"] && (
        <EmployerCompanyMiscellaneousInfo />
      )}
    </Layout>
  );
};

export default EmployerProfile;
