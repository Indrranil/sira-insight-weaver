import { ExternalLink, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { ResearchItem } from "@/lib/api";

interface ResearchResultProps {
  item: ResearchItem;
}

export function ResearchResult({ item }: ResearchResultProps) {
  const [isOpen, setIsOpen] = useState(false);
  const credibilityPercentage = Math.round(item.credibility * 100);

  return (
    <Card className="glass-card transition-smooth hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1"
              >
                View Source <ExternalLink className="h-3 w-3" />
              </a>
            </CardDescription>
          </div>
          <Badge
            variant={credibilityPercentage >= 70 ? "default" : "secondary"}
            className="flex items-center gap-1"
          >
            <TrendingUp className="h-3 w-3" />
            {credibilityPercentage}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Credibility Score</p>
          <Progress value={credibilityPercentage} className="h-2" />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Key Points:</p>
          <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
            {item.bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        </div>

        {item.reasons.length > 0 && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full">
                <AlertCircle className="h-4 w-4 mr-2" />
                {isOpen ? "Hide" : "Show"} Credibility Analysis
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-1">
              {item.reasons.map((reason, idx) => (
                <p key={idx} className="text-sm text-muted-foreground">
                  • {reason}
                </p>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
