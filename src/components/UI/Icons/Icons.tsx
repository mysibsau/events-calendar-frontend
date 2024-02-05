import React from "react";

const colors = new Map([
    ["danger", "#DD473B"],
    ["primary", "#006CB5"],
    ["warning", "#FFB946"],
    ["default", "#ADADAD"],
    ["black", "#000000"],
    ["white", "#FFFFFF"],
    ["success", "#79B833"]
]);

export type ColorTypes = "danger" | "primary" | "warning" | "default" | "black" | "white" | "success"

interface IProps {
    color?: ColorTypes,
    size?: number
}

export const IconSearch: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.70833 15.0417C12.2061 15.0417 15.0417 12.2061 15.0417 8.70833C15.0417 5.21053 12.2061 2.375 8.70833 2.375C5.21053 2.375 2.375 5.21053 2.375 8.70833C2.375 12.2061 5.21053 15.0417 8.70833 15.0417Z" stroke={colors.get(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.625 16.625L13.1813 13.1812" stroke={colors.get(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export const IconCloseX: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke={colors.get(color)} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.5 4.5L13.5 13.5" stroke={colors.get(color)} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export const IconSetting: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.075 6.91501C13.7175 6.91501 13.1625 5.95501 13.8375 4.77751C14.2275 4.09501 13.995 3.22501 13.3125 2.83501L12.015 2.09251C11.4225 1.74001 10.6575 1.95001 10.305 2.54251L10.2225 2.68501C9.5475 3.86251 8.4375 3.86251 7.755 2.68501L7.6725 2.54251C7.335 1.95001 6.57 1.74001 5.9775 2.09251L4.68 2.83501C3.9975 3.22501 3.765 4.10251 4.155 4.78501C4.8375 5.95501 4.2825 6.91501 2.925 6.91501C2.145 6.91501 1.5 7.55251 1.5 8.34001V9.66001C1.5 10.44 2.1375 11.085 2.925 11.085C4.2825 11.085 4.8375 12.045 4.155 13.2225C3.765 13.905 3.9975 14.775 4.68 15.165L5.9775 15.9075C6.57 16.26 7.335 16.05 7.6875 15.4575L7.77 15.315C8.445 14.1375 9.555 14.1375 10.2375 15.315L10.32 15.4575C10.6725 16.05 11.4375 16.26 12.03 15.9075L13.3275 15.165C14.01 14.775 14.2425 13.8975 13.8525 13.2225C13.17 12.045 13.725 11.085 15.0825 11.085C15.8625 11.085 16.5075 10.4475 16.5075 9.66001V8.34001C16.5 7.56001 15.8625 6.91501 15.075 6.91501ZM9 11.4375C7.6575 11.4375 6.5625 10.3425 6.5625 9.00001C6.5625 7.65751 7.6575 6.56251 9 6.56251C10.3425 6.56251 11.4375 7.65751 11.4375 9.00001C11.4375 10.3425 10.3425 11.4375 9 11.4375Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconArrowLeft: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5242 14.1867L12.5242 9.25458L12.5242 4.81333C12.5242 4.05333 11.6058 3.67333 11.0675 4.21167L6.96667 8.3125C6.30959 8.96958 6.30959 10.0383 6.96667 10.6954L8.52625 12.255L11.0675 14.7962C11.6058 15.3267 12.5242 14.9467 12.5242 14.1867Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconArrowRight: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.47583 4.81333L6.47583 9.74542L6.47583 14.1867C6.47583 14.9467 7.39416 15.3267 7.9325 14.7883L12.0333 10.6875C12.6904 10.0304 12.6904 8.96167 12.0333 8.30458L10.4737 6.745L7.9325 4.20375C7.39416 3.67333 6.47583 4.05334 6.47583 4.81333Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconDanger: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7C11 6.44772 11.4477 6 12 6Z" fill={colors.get(color)} />
            <path d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z" fill={colors.get(color)} />
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconSuccess: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill={colors.get(color)} fillRule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L10,13.5857864 L8.70710678,12.2928932 C8.31658249,11.9023689 7.68341751,11.9023689 7.29289322,12.2928932 C6.90236893,12.6834175 6.90236893,13.3165825 7.29289322,13.7071068 L9.29289322,15.7071068 C9.68341751,16.0976311 10.3165825,16.0976311 10.7071068,15.7071068 L16.7071068,9.70710678 C17.0976311,9.31658249 17.0976311,8.68341751 16.7071068,8.29289322 C16.3165825,7.90236893 15.6834175,7.90236893 15.2928932,8.29289322 Z" />
        </svg>
    );
};

export const IconTrushSquare: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1905 2H7.81049C4.17049 2 2.00049 4.17 2.00049 7.81V16.18C2.00049 19.83 4.17049 22 7.81049 22H16.1805C19.8205 22 21.9905 19.83 21.9905 16.19V7.81C22.0005 4.17 19.8305 2 16.1905 2ZM15.7605 15.76C15.7005 16.61 15.6305 17.67 13.7105 17.67H10.2905C8.38049 17.67 8.30049 16.61 8.24049 15.76L7.93049 11.8C7.91049 11.54 8.00049 11.29 8.17049 11.1C8.34049 10.91 8.59049 10.81 8.84049 10.81H15.1605C15.4105 10.81 15.6605 10.92 15.8305 11.1C16.0005 11.29 16.0905 11.54 16.0705 11.79L15.7605 15.76ZM16.8005 9.82C16.7805 9.82 16.7605 9.82 16.7405 9.82C15.7005 9.72 14.7505 9.65 13.8405 9.61C12.6205 9.55 11.4005 9.53 10.1705 9.58C9.57049 9.61 8.96049 9.65 8.36049 9.71L7.27049 9.82C7.25049 9.82 7.22049 9.82 7.20049 9.82C6.85049 9.82 6.55049 9.56 6.52049 9.2C6.48049 8.83 6.76049 8.49 7.13049 8.46L8.22049 8.35C8.65049 8.31 9.07049 8.28 9.50049 8.26L9.58049 7.79C9.66049 7.29 9.81049 6.33 11.3105 6.33H12.7005C14.2105 6.33 14.3605 7.32 14.4305 7.8L14.5105 8.28C15.2605 8.32 16.0305 8.38 16.8705 8.46C17.2505 8.5 17.5205 8.83 17.4905 9.21C17.4505 9.56 17.1505 9.82 16.8005 9.82Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconLogo = () => {
    return (
        <svg width="200" height="80" viewBox="0 0 129 43" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="40" height="42.449" fill="url(#pattern0)" />
            <path d="M53.192 20.108C52.504 20.108 51.968 19.964 51.584 19.676C51.208 19.388 50.944 19 50.792 18.512C50.648 18.024 50.576 17.48 50.576 16.88V13.448C50.576 12.792 50.648 12.22 50.792 11.732C50.944 11.244 51.208 10.868 51.584 10.604C51.968 10.332 52.504 10.196 53.192 10.196C53.8 10.196 54.28 10.308 54.632 10.532C54.992 10.756 55.248 11.076 55.4 11.492C55.56 11.908 55.64 12.408 55.64 12.992V13.76H54.356V13.076C54.356 12.716 54.336 12.4 54.296 12.128C54.264 11.848 54.168 11.632 54.008 11.48C53.848 11.328 53.58 11.252 53.204 11.252C52.82 11.252 52.54 11.336 52.364 11.504C52.188 11.664 52.072 11.896 52.016 12.2C51.968 12.496 51.944 12.844 51.944 13.244V17.096C51.944 17.584 51.984 17.972 52.064 18.26C52.144 18.54 52.276 18.74 52.46 18.86C52.644 18.98 52.892 19.04 53.204 19.04C53.572 19.04 53.836 18.96 53.996 18.8C54.156 18.632 54.256 18.404 54.296 18.116C54.336 17.828 54.356 17.492 54.356 17.108V16.388H55.64V17.108C55.64 17.7 55.568 18.224 55.424 18.68C55.28 19.128 55.032 19.48 54.68 19.736C54.328 19.984 53.832 20.108 53.192 20.108ZM56.9318 20V10.28H58.1318V17.012L60.9758 10.28H61.9478V20H60.7598V13.16L57.9398 20H56.9318ZM63.4708 20V10.28H67.6468V11.264H64.8268V14.324H65.1268C65.8308 14.324 66.4108 14.408 66.8668 14.576C67.3308 14.736 67.6748 15.02 67.8988 15.428C68.1308 15.836 68.2468 16.412 68.2468 17.156C68.2468 17.66 68.1868 18.092 68.0668 18.452C67.9468 18.804 67.7588 19.096 67.5028 19.328C67.2548 19.56 66.9388 19.732 66.5548 19.844C66.1788 19.948 65.7268 20 65.1988 20H63.4708ZM64.8268 19.028H65.2108C65.6108 19.028 65.9388 18.984 66.1948 18.896C66.4588 18.8 66.6508 18.616 66.7708 18.344C66.8988 18.072 66.9628 17.672 66.9628 17.144C66.9628 16.48 66.8348 16.008 66.5788 15.728C66.3308 15.448 65.8628 15.308 65.1748 15.308H64.8268V19.028ZM69.4005 20V10.28H73.0965V11.288H70.7565V20H69.4005ZM73.9094 21.476V20.432C74.3254 20.472 74.6454 20.472 74.8694 20.432C75.1014 20.392 75.2614 20.308 75.3494 20.18C75.4454 20.06 75.4934 19.896 75.4934 19.688C75.4934 19.472 75.4694 19.216 75.4214 18.92L73.5014 10.28H74.7854L75.6014 14.42L76.0934 17.504L76.5254 14.444L77.2574 10.28H78.5534L76.8134 18.944C76.7334 19.336 76.6654 19.68 76.6094 19.976C76.5614 20.272 76.4894 20.524 76.3934 20.732C76.3054 20.94 76.1694 21.104 75.9854 21.224C75.8014 21.344 75.5414 21.424 75.2054 21.464C74.8774 21.504 74.4454 21.508 73.9094 21.476ZM50.648 33V26.064H51.728V30.732L53.816 26.064H54.824V33H53.768V28.296L51.692 33H50.648ZM56.0964 33L56.1684 26.064H57.1164L58.6524 30.324L60.2004 26.064H61.1484L61.2204 33H60.1404V28.86L58.8564 32.316H58.4604L57.1764 28.884V33H56.0964ZM64.4039 33.096C63.8599 33.096 63.4399 32.992 63.1439 32.784C62.8479 32.568 62.6399 32.256 62.5199 31.848C62.4079 31.432 62.3519 30.924 62.3519 30.324V28.74C62.3519 28.124 62.4119 27.612 62.5319 27.204C62.6519 26.796 62.8599 26.488 63.1559 26.28C63.4599 26.072 63.8759 25.968 64.4039 25.968C64.9879 25.968 65.4159 26.088 65.6879 26.328C65.9679 26.568 66.1519 26.916 66.2399 27.372C66.3279 27.82 66.3719 28.36 66.3719 28.992V29.556H63.6359V30.948C63.6359 31.228 63.6599 31.456 63.7079 31.632C63.7639 31.808 63.8479 31.94 63.9599 32.028C64.0799 32.108 64.2319 32.148 64.4159 32.148C64.6079 32.148 64.7519 32.104 64.8479 32.016C64.9519 31.92 65.0199 31.788 65.0519 31.62C65.0919 31.444 65.1119 31.24 65.1119 31.008V30.588H66.3599V30.852C66.3599 31.548 66.2119 32.096 65.9159 32.496C65.6199 32.896 65.1159 33.096 64.4039 33.096ZM63.6359 28.86H65.1119V28.236C65.1119 27.948 65.0959 27.708 65.0639 27.516C65.0319 27.316 64.9639 27.168 64.8599 27.072C64.7639 26.968 64.6079 26.916 64.3919 26.916C64.1839 26.916 64.0239 26.964 63.9119 27.06C63.8079 27.156 63.7359 27.32 63.6959 27.552C63.6559 27.776 63.6359 28.088 63.6359 28.488V28.86ZM67.5347 33V26.064H68.8187V28.98H70.4627V26.064H71.7467V33H70.4627V29.916H68.8187V33H67.5347ZM73.0425 33V26.064H74.1225V30.732L76.2105 26.064H77.2185V33H76.1625V28.296L74.0865 33H73.0425ZM81.3771 33V23.28H83.7891C84.3731 23.28 84.8371 23.388 85.1811 23.604C85.5331 23.812 85.7891 24.116 85.9491 24.516C86.1091 24.916 86.1891 25.4 86.1891 25.968C86.1891 26.48 86.0971 26.924 85.9131 27.3C85.7371 27.676 85.4731 27.968 85.1211 28.176C84.7691 28.376 84.3291 28.476 83.8011 28.476H82.7331V33H81.3771ZM82.7331 27.504H83.3571C83.7491 27.504 84.0571 27.46 84.2811 27.372C84.5051 27.284 84.6651 27.132 84.7611 26.916C84.8571 26.692 84.9051 26.38 84.9051 25.98C84.9051 25.516 84.8691 25.16 84.7971 24.912C84.7331 24.664 84.5931 24.492 84.3771 24.396C84.1611 24.3 83.8251 24.252 83.3691 24.252H82.7331V27.504ZM88.9547 33.096C88.4107 33.096 87.9907 32.992 87.6947 32.784C87.3987 32.568 87.1907 32.256 87.0707 31.848C86.9587 31.432 86.9027 30.924 86.9027 30.324V28.74C86.9027 28.124 86.9627 27.612 87.0827 27.204C87.2027 26.796 87.4107 26.488 87.7067 26.28C88.0107 26.072 88.4267 25.968 88.9547 25.968C89.5387 25.968 89.9667 26.088 90.2387 26.328C90.5187 26.568 90.7027 26.916 90.7907 27.372C90.8787 27.82 90.9227 28.36 90.9227 28.992V29.556H88.1867V30.948C88.1867 31.228 88.2107 31.456 88.2587 31.632C88.3147 31.808 88.3987 31.94 88.5107 32.028C88.6307 32.108 88.7827 32.148 88.9667 32.148C89.1587 32.148 89.3027 32.104 89.3987 32.016C89.5027 31.92 89.5707 31.788 89.6027 31.62C89.6427 31.444 89.6627 31.24 89.6627 31.008V30.588H90.9107V30.852C90.9107 31.548 90.7627 32.096 90.4667 32.496C90.1707 32.896 89.6667 33.096 88.9547 33.096ZM88.1867 28.86H89.6627V28.236C89.6627 27.948 89.6467 27.708 89.6147 27.516C89.5827 27.316 89.5147 27.168 89.4107 27.072C89.3147 26.968 89.1587 26.916 88.9427 26.916C88.7347 26.916 88.5747 26.964 88.4627 27.06C88.3587 27.156 88.2867 27.32 88.2467 27.552C88.2067 27.776 88.1867 28.088 88.1867 28.488V28.86ZM92.0855 33V26.064H93.3215V32.088H94.5455V26.064H95.7815V32.088H97.0055V26.064H98.2415V33H92.0855ZM101.506 33.096C100.962 33.096 100.542 32.992 100.246 32.784C99.9495 32.568 99.7415 32.256 99.6215 31.848C99.5095 31.432 99.4535 30.924 99.4535 30.324V28.74C99.4535 28.124 99.5135 27.612 99.6335 27.204C99.7535 26.796 99.9615 26.488 100.258 26.28C100.562 26.072 100.978 25.968 101.506 25.968C102.09 25.968 102.518 26.088 102.79 26.328C103.07 26.568 103.254 26.916 103.342 27.372C103.43 27.82 103.474 28.36 103.474 28.992V29.556H100.738V30.948C100.738 31.228 100.762 31.456 100.81 31.632C100.866 31.808 100.95 31.94 101.062 32.028C101.182 32.108 101.334 32.148 101.518 32.148C101.71 32.148 101.854 32.104 101.95 32.016C102.054 31.92 102.122 31.788 102.154 31.62C102.194 31.444 102.214 31.24 102.214 31.008V30.588H103.462V30.852C103.462 31.548 103.314 32.096 103.018 32.496C102.722 32.896 102.218 33.096 101.506 33.096ZM100.738 28.86H102.214V28.236C102.214 27.948 102.198 27.708 102.166 27.516C102.134 27.316 102.066 27.168 101.962 27.072C101.866 26.968 101.71 26.916 101.494 26.916C101.286 26.916 101.126 26.964 101.014 27.06C100.91 27.156 100.838 27.32 100.798 27.552C100.758 27.776 100.738 28.088 100.738 28.488V28.86ZM105.369 33V27.024H104.073V26.064H107.961V27.024H106.653V33H105.369ZM108.738 33V26.064H110.022V28.98H111.666V26.064H112.95V33H111.666V29.916H110.022V33H108.738ZM116.166 33.096C115.622 33.096 115.202 32.992 114.906 32.784C114.61 32.568 114.402 32.256 114.282 31.848C114.17 31.432 114.114 30.924 114.114 30.324V28.74C114.114 28.124 114.174 27.612 114.294 27.204C114.414 26.796 114.622 26.488 114.918 26.28C115.222 26.072 115.638 25.968 116.166 25.968C116.75 25.968 117.178 26.088 117.45 26.328C117.73 26.568 117.914 26.916 118.002 27.372C118.09 27.82 118.134 28.36 118.134 28.992V29.556H115.398V30.948C115.398 31.228 115.422 31.456 115.47 31.632C115.526 31.808 115.61 31.94 115.722 32.028C115.842 32.108 115.994 32.148 116.178 32.148C116.37 32.148 116.514 32.104 116.61 32.016C116.714 31.92 116.782 31.788 116.814 31.62C116.854 31.444 116.874 31.24 116.874 31.008V30.588H118.122V30.852C118.122 31.548 117.974 32.096 117.678 32.496C117.382 32.896 116.878 33.096 116.166 33.096ZM115.398 28.86H116.874V28.236C116.874 27.948 116.858 27.708 116.826 27.516C116.794 27.316 116.726 27.168 116.622 27.072C116.526 26.968 116.37 26.916 116.154 26.916C115.946 26.916 115.786 26.964 115.674 27.06C115.57 27.156 115.498 27.32 115.458 27.552C115.418 27.776 115.398 28.088 115.398 28.488V28.86ZM119.296 33V26.064H121.24C121.712 26.064 122.08 26.144 122.344 26.304C122.616 26.456 122.808 26.66 122.92 26.916C123.04 27.164 123.104 27.432 123.112 27.72C123.12 28.064 123.064 28.372 122.944 28.644C122.824 28.916 122.576 29.108 122.2 29.22C122.488 29.276 122.708 29.396 122.86 29.58C123.02 29.756 123.128 29.968 123.184 30.216C123.248 30.464 123.28 30.72 123.28 30.984C123.28 31.384 123.22 31.736 123.1 32.04C122.988 32.344 122.788 32.58 122.5 32.748C122.22 32.916 121.82 33 121.3 33H119.296ZM120.556 32.028H121.012C121.196 32.028 121.364 32.004 121.516 31.956C121.668 31.9 121.788 31.792 121.876 31.632C121.972 31.472 122.02 31.24 122.02 30.936C122.02 30.576 121.976 30.316 121.888 30.156C121.808 29.988 121.696 29.884 121.552 29.844C121.416 29.804 121.256 29.784 121.072 29.784H120.556V32.028ZM120.556 28.86H121.18C121.428 28.86 121.624 28.788 121.768 28.644C121.912 28.5 121.984 28.244 121.984 27.876C121.984 27.548 121.9 27.32 121.732 27.192C121.564 27.064 121.336 27 121.048 27H120.556V28.86ZM125.525 33.096C125.253 33.096 125.013 33.02 124.805 32.868C124.597 32.708 124.433 32.508 124.313 32.268C124.193 32.02 124.133 31.76 124.133 31.488C124.133 31.056 124.205 30.692 124.349 30.396C124.493 30.1 124.689 29.852 124.937 29.652C125.193 29.444 125.485 29.264 125.813 29.112C126.149 28.96 126.501 28.812 126.869 28.668V28.176C126.869 27.896 126.853 27.664 126.821 27.48C126.789 27.296 126.721 27.16 126.617 27.072C126.521 26.976 126.373 26.928 126.173 26.928C125.997 26.928 125.853 26.968 125.741 27.048C125.637 27.128 125.561 27.244 125.513 27.396C125.465 27.54 125.441 27.712 125.441 27.912V28.26L124.169 28.212C124.185 27.444 124.361 26.88 124.697 26.52C125.033 26.152 125.553 25.968 126.257 25.968C126.945 25.968 127.433 26.156 127.721 26.532C128.009 26.908 128.153 27.452 128.153 28.164V31.332C128.153 31.548 128.157 31.756 128.165 31.956C128.181 32.156 128.197 32.344 128.213 32.52C128.237 32.688 128.257 32.848 128.273 33H127.097C127.073 32.872 127.041 32.712 127.001 32.52C126.969 32.32 126.945 32.14 126.929 31.98C126.849 32.252 126.693 32.508 126.461 32.748C126.237 32.98 125.925 33.096 125.525 33.096ZM126.029 31.992C126.157 31.992 126.277 31.956 126.389 31.884C126.501 31.812 126.601 31.732 126.689 31.644C126.777 31.548 126.837 31.472 126.869 31.416V29.448C126.669 29.56 126.481 29.672 126.305 29.784C126.129 29.896 125.973 30.016 125.837 30.144C125.709 30.264 125.605 30.404 125.525 30.564C125.453 30.716 125.417 30.892 125.417 31.092C125.417 31.372 125.469 31.592 125.573 31.752C125.677 31.912 125.829 31.992 126.029 31.992Z" fill="#77787B" />
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_7_74" transform="translate(-0.00181932) scale(0.00822655 0.00775194)" />
                </pattern>
                <image id="image0_7_74" width="122" height="129" xlinkHref="data:image/png;base64,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" />
            </defs>
        </svg>
    );
};

export const IconUser: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.7471 25.5862C28.6479 25.5862 31.4299 24.4338 33.4811 22.3827C35.5323 20.3315 36.6846 17.5495 36.6846 14.6487C36.6846 11.7479 35.5323 8.96588 33.4811 6.9147C31.4299 4.86352 28.6479 3.71118 25.7471 3.71118C22.8463 3.71118 20.0643 4.86352 18.0132 6.9147C15.962 8.96588 14.8096 11.7479 14.8096 14.6487C14.8096 17.5495 15.962 20.3315 18.0132 22.3827C20.0643 24.4338 22.8463 25.5862 25.7471 25.5862ZM12.4659 28.7112C11.0155 28.7112 9.62448 29.2874 8.59889 30.3129C7.5733 31.3385 6.99713 32.7295 6.99713 34.1799V34.9612C6.99713 38.7002 9.37682 41.8627 12.7549 44.0127C16.1518 46.1752 20.7503 47.4612 25.7471 47.4612C30.744 47.4612 35.3409 46.1752 38.7393 44.0127C42.1174 41.8627 44.4971 38.7002 44.4971 34.9612V34.1799C44.4971 32.7295 43.921 31.3385 42.8954 30.3129C41.8698 29.2874 40.4788 28.7112 39.0284 28.7112H12.4659Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconLock: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 4.16663C19.2563 4.16663 14.5833 8.83954 14.5833 14.5833V20.8333H12.5C11.3949 20.8333 10.3351 21.2723 9.55373 22.0537C8.77233 22.8351 8.33334 23.8949 8.33334 25V41.6666C8.33334 42.7717 8.77233 43.8315 9.55373 44.6129C10.3351 45.3943 11.3949 45.8333 12.5 45.8333H37.5C38.6051 45.8333 39.6649 45.3943 40.4463 44.6129C41.2277 43.8315 41.6667 42.7717 41.6667 41.6666V25C41.6667 23.8949 41.2277 22.8351 40.4463 22.0537C39.6649 21.2723 38.6051 20.8333 37.5 20.8333H35.4167V14.5833C35.4167 8.83954 30.7438 4.16663 25 4.16663ZM18.75 14.5833C18.75 11.1375 21.5542 8.33329 25 8.33329C28.4458 8.33329 31.25 11.1375 31.25 14.5833V20.8333H18.75V14.5833ZM27.0833 36.9229V41.6666H22.9167V36.9229C22.1883 36.5058 21.6035 35.8777 21.2392 35.1215C20.875 34.3653 20.7485 33.5165 20.8764 32.687C21.0043 31.8575 21.3807 31.0862 21.9558 30.4748C22.5309 29.8635 23.2777 29.4408 24.0979 29.2625C24.7071 29.1278 25.3388 29.1315 25.9464 29.2735C26.5539 29.4154 27.1219 29.6919 27.6083 30.0826C28.0948 30.4733 28.4873 30.9682 28.757 31.5308C29.0267 32.0934 29.1667 32.7094 29.1667 33.3333C29.1655 34.0619 28.9723 34.7774 28.6065 35.4076C28.2408 36.0377 27.7154 36.5604 27.0833 36.9229Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconElips: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill={colors.get(color)} />
        </svg>
    );
};

export const IconPen: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.74353 15.2183V18.4473H7.85449L19.9791 8.92386L15.8681 5.69485L3.74353 15.2183ZM23.1582 6.42676C23.5858 6.09095 23.5858 5.54847 23.1582 5.21266L20.593 3.19775C20.1655 2.86194 19.4748 2.86194 19.0473 3.19775L17.0411 4.77351L21.1521 8.00252L23.1582 6.42676V6.42676Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconArrowDown: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1867 6.47583L9.25463 6.47583L4.81338 6.47583C4.05338 6.47583 3.67338 7.39417 4.21171 7.9325L8.31254 12.0333C8.96963 12.6904 10.0384 12.6904 10.6955 12.0333L12.255 10.4737L14.7963 7.9325C15.3267 7.39417 14.9467 6.47583 14.1867 6.47583Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconArrowUp: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.54706 9.22833L7.18122 9.22833L10.4537 9.22833C11.0137 9.22833 11.2937 8.55167 10.8971 8.155L7.87539 5.13333C7.39122 4.64917 6.60372 4.64917 6.11956 5.13333L4.97039 6.2825L3.09789 8.155C2.70706 8.55167 2.98706 9.22833 3.54706 9.22833Z" fill={colors.get(color)} />
        </svg>
    );
};

export const IconlogOut: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill={colors.get(color)} d="M51.213,175.001h173.785c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15H51.213l19.394-19.394   c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.858-15.355-5.858-21.213,0L4.396,149.393c-0.351,0.351-0.683,0.719-0.997,1.103   c-0.137,0.167-0.256,0.344-0.385,0.515c-0.165,0.22-0.335,0.435-0.488,0.664c-0.14,0.209-0.261,0.426-0.389,0.64   c-0.123,0.206-0.252,0.407-0.365,0.619c-0.118,0.22-0.217,0.446-0.323,0.67c-0.104,0.219-0.213,0.435-0.306,0.659   c-0.09,0.219-0.164,0.442-0.243,0.664c-0.087,0.24-0.179,0.477-0.253,0.722c-0.067,0.222-0.116,0.447-0.172,0.672   c-0.063,0.249-0.133,0.497-0.183,0.751c-0.051,0.259-0.082,0.521-0.119,0.782c-0.032,0.223-0.075,0.443-0.097,0.669   c-0.048,0.484-0.073,0.971-0.074,1.457c0,0.007-0.001,0.015-0.001,0.022c0,0.007,0.001,0.015,0.001,0.022   c0.001,0.487,0.026,0.973,0.074,1.458c0.022,0.223,0.064,0.44,0.095,0.661c0.038,0.264,0.069,0.528,0.121,0.79   c0.05,0.252,0.119,0.496,0.182,0.743c0.057,0.227,0.107,0.456,0.175,0.681c0.073,0.241,0.164,0.474,0.248,0.71   c0.081,0.226,0.155,0.453,0.247,0.675c0.091,0.22,0.198,0.431,0.3,0.646c0.108,0.229,0.21,0.46,0.33,0.685   c0.11,0.205,0.235,0.4,0.354,0.599c0.131,0.221,0.256,0.444,0.4,0.659c0.146,0.219,0.309,0.424,0.466,0.635   c0.136,0.181,0.262,0.368,0.407,0.544c0.299,0.364,0.616,0.713,0.947,1.048c0.016,0.016,0.029,0.034,0.045,0.05l45,45.001   c2.93,2.929,6.768,4.394,10.607,4.394c3.838-0.001,7.678-1.465,10.606-4.393c5.858-5.858,5.858-15.355,0.001-21.213L51.213,175.001   z" />
            <path fill={colors.get(color)} d="M305.002,25h-190c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15s15-6.716,15-15V55h160v210.001h-160   v-45.001c0-8.284-6.716-15-15-15s-15,6.716-15,15v60.001c0,8.284,6.716,15,15,15h190c8.284,0,15-6.716,15-15V40   C320.002,31.716,313.286,25,305.002,25z" />
        </svg>
    )
}

export const IconGroup: React.FC<IProps> = ({ color = "default", size = 19 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill={colors.get(color)} d="M500.8,66.4H287.3l-17.7-55.2H63.3v109.4H11.2v380.2h437.5V391.4h52.1V66.4z M428.9,480H32V141.4h170.8l17.7,55.2h208.3   V480z M480,371.6h-31.3V175.8H235.2l-17.7-55.2H84.1V32H255l17.7,55.2H480V371.6z" />
        </svg>
    )
}