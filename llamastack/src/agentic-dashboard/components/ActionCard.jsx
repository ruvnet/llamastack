import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Code: Code,
  Clock: Clock,
  BarChart2: BarChart2,
};

const ActionCard = ({ title, description, icon, link }) => {
  const Icon = iconMap[icon];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {Icon && <Icon className="w-5 h-5" />}
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link to={link}>Get Started</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionCard;