const lotData = Array.from({ length: 100 }, (_, index) => ({
  name: `Lot ${index + 1}`,
  description: `Description for lot ${index + 1}`,
  category: "Category",
  price: `$${(index + 1) * 10}`,
  date: "2024-05-21",
  image: "path/to/image.jpg",
}));

export default lotData;
