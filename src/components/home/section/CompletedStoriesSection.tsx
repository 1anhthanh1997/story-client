import React from "react";
import GridTwoRowLayout from "../../common/GridTwoRowLayout";

interface CompletedStoriesSectionProps {
  completedStories: any[];
}

const CompletedStoriesSection: React.FC<CompletedStoriesSectionProps> = ({
  completedStories,
}) => {
  return <GridTwoRowLayout data={completedStories} />;
};

export default CompletedStoriesSection;


