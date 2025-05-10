export const COLORS = {
    primary: "#F8FAE5",
    itemColor: "#739072",
    active: "#43766C",
    activeStrength: "#12372A",
    blackTextColor: "#1a1a1a",
    whiteTextColor: "#FFFFFF",
    lightColor: "#D4E7C5",
    shopActive: "#739072",
    line: "#E5E7EB",
    btnColor: "#308AFF",
    succcess: "#7bcb44",
    noActive: "#616161",
    aLevel: "#4CAF50",
    bLevel: "#fca02b",
    cLevel: "#f3521e",
    personalIcon: "#6B7280",
    greenColor: "#4CAF50",
    averageTime: "#FF9800",
    averageScore: "#2196F3",
    backgroundColor: "#F9FAFB",
    subTextColor: "#6B7280",
    shadowColor: "#000000",
    grayColor: "#666666",
    contentColor: "#2c3e50",
    sectionBackground: "#FFFFFF",
    itemBackground: "#FFFFFF",
    dangerColor: "#FF3B30",
    doExamAnswerBackgroundColor: "#e0f7fa",
    doExamAnswerBorderColor: "#00796b",
    lightTextColor: "#333333",
    chooseListNewCardBackgroundColor: "#1e1e1e",
    blueColor: "#1976D2",
    lightGrayColor: "#E0E0E0",
    greenIconColor: "#4CAF50",
    blueIconColor: "#2196F3",
    yellowIconColor: "#FF9800",
    titleColor: "#1a237e",
    blackIconColor: "#000000",
}

export const wordLevel = {
    aLevel: ["A1", "A2"],
    bLevel: ["B1", "B2"]
}

export const HEADER_CONFIG = {
    collection: {
        headerText: "Trang chủ",
        rightIcons: ["search", "bell"],
        onRightIconPress: (navigation, index) => {
            // if (index === 0) {
            //     navigation.navigate('Search');
            // } else {
            //     navigation.navigate('Notifications');
            // }
        }
    },
    word: {
        headerText: "Học từ vựng",
        rightIcons: ["search", "bell"],
        onRightIconPress: (navigation, index) => {
            // if (index === 0) {
            //     navigation.navigate('Search');
            // } else {
            //     navigation.navigate('Notifications');
            // }
        }
    },
    blog: {
        headerText: "Bài viết",
        rightIcons: ["search", "bell"],
        onRightIconPress: (navigation, index) => {
            // if (index === 0) {
            //     navigation.navigate('Search');
            // } else {
            //     navigation.navigate('Notifications');
            // }
        }
    },
    quiz: {
        headerText: "Bài Reading TOEIC",
        rightIcons: ["search", "bell"],
        onRightIconPress: (navigation, index) => {
            // if (index === 0) {
            //     navigation.navigate('Search');
            // } else {
            //     navigation.navigate('Notifications');
            // }
        }
    }
}