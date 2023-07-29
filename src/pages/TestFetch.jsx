// import {
//   Toolbar,
//   Container,
//   Stack,
//   Button,
//   TextField,
//   Box,
// } from "@mui/material";
// import { useState } from "react";

// const MyCard = ({ isLiked, handleClick, id }) => {
//   return (
//     <Box>
//       {isLiked ? "красный" : "черный"}
//       <Button
//         variant={isLiked ? "contained" : "filled"}
//         onClick={() => {
//           handleClick(id);
//         }}
//       >
//         Нажми на меня
//       </Button>
//     </Box>
//   );
// };
// export const TestFetch = () => {
//   const [hotels, setHotels] = useState([
//     { id: 1, name: "hello", isLiked: true },
//     { id: 2, name: "hello", isLiked: true },
//     { id: 3, name: "hello", isLiked: true },
//     { id: 4, name: "hello", isLiked: true },
//     { id: 5, name: "hello", isLiked: true },
//     { id: 6, name: "hello", isLiked: true },
//   ]);

//   const filterHotels = (id) => {
//     setHotels(hotels.filter((hotel) => hotel.id !== id));
//   };
//   return (
//     <Container>
//       <Toolbar />
//       <Stack spacing={2} pt={2}>
//         {hotels.map((hotel, index, id) => (
//           <MyCard
//             key={index}
//             isLiked={hotel.isLiked}
//             handleClick={filterHotels}
//           >
//             {hotel.name}
//           </MyCard>
//         ))}
//       </Stack>
//     </Container>
//   );
// };


import { Toolbar, Container, Stack, Button, Box } from "@mui/material";
import { useState } from "react";

const MyCard = ({ isLiked, handleClick, id }) => {
  return (
    <Box>
      {id}
      {/* {isLiked ? "красный" : "черный"} */}
      <Button
        variant={isLiked ? "contained" : "filled"}
        onClick={() => {
          handleClick(id);
        }}
      >
        12312321321321312
      </Button>
    </Box>
  );
};

export const TestFetch = () => {
  const [hotels, setHotels] = useState([
    { id: 1, name: "hello", isLiked: true },
    { id: 2, name: "hello", isLiked: true },
    { id: 3, name: "hello", isLiked: false },
    { id: 4, name: "hello", isLiked: true },
    { id: 5, name: "hello", isLiked: false },
    { id: 6, name: "hello", isLiked: true },
  ]);

  // const filterHotels = (idToRemove) => {
  //   setHotels(hotels.filter((hotel) => hotel.id !== idToRemove));
  // };

  // const filterHotels = (idToRemove) => {
    // setHotels(hotels.filter((hotel) => hotel.id !== idToRemove));
  // };

  const toggleLike = (idToToggle) => {
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === idToToggle ? { ...hotel, isLiked: !hotel.isLiked } : hotel
      )
    );
  };

  return (
    <Container>
      <Toolbar />
      <Stack spacing={2} pt={2}>
        {hotels.map((hotel) => (
          <MyCard
            key={hotel.id}
            isLiked={hotel.isLiked}
            handleClick={toggleLike}
            id={hotel.id}
          >
            {hotel.name}
          </MyCard>
        ))}
      </Stack>
    </Container>
  );
};
