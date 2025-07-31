import { BASE_URL } from "../config";
import {
  CreateParticipantData,
  UpdateParticipantData,
  Participant,
} from "../../types/model";

const PARTICIPANT_URI = "/participant";

export const createParticipant = async (
  participantData: CreateParticipantData
): Promise<Participant> => {
  const data = await fetch(`${BASE_URL}${PARTICIPANT_URI}`, {
    method: "POST",
    body: JSON.stringify(participantData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.ok) {
    throw new Error(`Failed to create participant: ${data.statusText}`);
  }

  const response = await data.json();
  return response;
};

export const getAllParticipants = async (): Promise<Participant[]> => {
  const data = await fetch(`${BASE_URL}${PARTICIPANT_URI}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.ok) {
    throw new Error(`Failed to fetch participants: ${data.statusText}`);
  }

  const response = await data.json();
  return response;
};

export const getParticipantById = async (id: string): Promise<Participant> => {
  const data = await fetch(`${BASE_URL}${PARTICIPANT_URI}/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.ok) {
    throw new Error(`Failed to fetch participant: ${data.statusText}`);
  }

  const response = await data.json();
  return response;
};

export const updateParticipant = async (
  id: string,
  participantData: UpdateParticipantData
): Promise<Participant> => {
  const data = await fetch(`${BASE_URL}${PARTICIPANT_URI}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participantData),
    credentials: "include",
  });

  if (!data.ok) {
    throw new Error(`Failed to update participant: ${data.statusText}`);
  }

  const response = await data.json();
  return response;
};

export const removeParticipant = async (id: string): Promise<void> => {
  const data = await fetch(`${BASE_URL}${PARTICIPANT_URI}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!data.ok) {
    throw new Error(`Failed to remove participant: ${data.statusText}`);
  }
};
