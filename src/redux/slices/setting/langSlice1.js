/* eslint-disable */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentLang : "en",
    vi : {
        Home: "Trang chủ",
        Message: "Tin nhắn",
        Upcoming: "Sắp diễn ra",
        Tutors: "Gia sư",
        Settings: "Cài đặt",
        Filter_Tutors: "Lọc gia sư",
        Recommend_Tutors: "Gia sư đề xuất",
        See_All: "Xem tất cả",
        Enter_lesson_room: "Vào phòng học",
        Book: "Đặt lịch",
        Upcoming_Lesson: "Bài học sắp diễn ra",
        Profile: "Hồ sơ",
        Schedule: "Thời khóa biểu",
        History: "Lịch sử",
        Courses: "Giáo trình",
        Favorite: "Yêu thích",
        Become_a_tutor: "Trở thành gia sư",
        Logout: "Đăng xuất",
        Booking: "Đặt ngay",
        Report: "Báo cáo",
        Languages: "Ngôn ngữ",
        Education: "Học vấn",
        Experience: "Kinh nghiệm",
        Interest: "Sở thích",
        Profession: "Nghề nghiệp",
        Specialities: "Chuyên môn",
        Rating_and_Comments: "Đánh giá và bình luận",
        Click_to_see: "Nhấn xem",
        Search: "Tìm kiếm",
        Cancel: "Hủy",
        Go_to_meeting: "Đi đến meeting",
        Name: "Tên",
        Select_country: "Chọn quốc gia",
        Theme: "Màu nền",
        Language: "Ngôn ngữ",
        What_to_learn: "Chủ đề muốn học",
        Save: "Lưu",
        Country: "Quốc gia",
        viewFeedbacks: "Xem Feedback",
        FeedbackList: "Danh sách Feedback",
        noData: "Chưa có dữ liệu",
      },
    en: {
        Home: "Home",
        Message: "Message",
        Upcoming: "Upcoming",
        Tutors: "Tutors",
        Settings: "Settings",
        Filter_Tutors: "Filter Tutors",
        Recommend_Tutors: "Recommend Tutors",
        See_All: "See All",
        Enter_lesson_room: "Enter lesson room",
        Book: "Book",
        Upcoming_Lesson: "Upcoming Lesson",
        Profile: "Profile",
        Schedule: "Schedule",
        History: "History",
        Courses: "Courses",
        Favorite: "Favorites",
        Become_a_tutor: "Become a tutor",
        Logout: "Logout",
        Booking: "Booking",
        Report: "Report",
        Languages: "Languages",
        Education: "Education",
        Experience: "Experience",
        Interest: "Interest",
        Profession: "Profession",
        Specialities: "Specialities",
        Rating_and_Comments: "Rating and Comments",
        Click_to_see: "Click to see",
        Search: "Search",
        Cancel: "Cancel",
        Go_to_meeting: "Go to meeting",
        Name: "Name",
        Select_country: "Select country",
        Theme: "Theme",
        Language: "Language",
        What_to_learn: "What to learn",
        Save: "Save",
        Country: "Country",
        viewFeedbacks: "View Feedbacks",
        FeedbackList: "Feedback List",
        noData: "No Data"
      }
}


const langSlice1 = createSlice({
    name: 'lang',
    initialState,
    reducers:{
        change: (state, action) => {
            if(state.currentLang == "en")
            {
               state.currentLang = "vi";
            }else{
                state.currentLang = "en";
            }
        }
    },
})

export const {change} = langSlice1.actions;
export default langSlice1.reducer;