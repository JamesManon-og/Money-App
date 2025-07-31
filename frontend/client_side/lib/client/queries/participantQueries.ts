"use client";
import { useQuery } from "@tanstack/react-query";

import {
  getAllParticipants,
  getParticipantById,
} from "../services/participantService";

export const useGetAllParticipants = () => {
  return useQuery({
    queryKey: ["participants"],
    queryFn: () => getAllParticipants(),
  });
};

export const useGetParticipantById = (id: string) => {
  return useQuery({
    queryKey: ["participants", id],
    queryFn: () => getParticipantById(id),
  });
};
