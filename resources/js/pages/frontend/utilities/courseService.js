import axios from 'axios';

const API_URL = '/api/courses';

export const fetchCourseWithLessons = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/${courseId}/lessons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course with lessons:", error);
    throw error;
  }
};

// Add other course-related API calls here
export const fetchCourse = async (courseId) => {
  const response = await axios.get(`${API_URL}/${courseId}`);
  return response.data;
};