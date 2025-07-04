import { useGetPatientsQuery, useAddPatientMutation } from '@/store/api/patientsApi';

const usePatients = () => {
  return {
    useGetPatientsQuery,
    useAddPatientMutation,
  };
};

export default usePatients;
