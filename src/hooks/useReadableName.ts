export default function useReadableName(category: string) {
  switch (category) {
    case "max_atmosphering_speed":
      return "Max speed";
      break;
    case "cost_in_credits":
      return "Credit cost";
      break;
    case "films":
      return "Film appearances";
      break;
    default:
      return category;
      break;
  }
}
