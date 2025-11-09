// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Phone,
  Clock,
  Calendar,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConversationPage() {
  const conversationData = {
    id: "CONV-001",
    agentName: "English Teacher",
    callDate: "Nov 5, 2025",
    callTime: "10:30 AM",
    duration: "15:30",
    status: "Completed",
    summary:
      "The caller inquired about English learning programs. The AI agent provided information about beginner to advanced courses, pricing options, and available time slots. The caller expressed interest in the intermediate package and requested a callback for enrollment.",
    transcript: [
      {
        speaker: "AI Agent",
        message:
          "Hello! This is your English Teacher assistant. How can I help you today?",
        timestamp: "10:30:00",
      },
      {
        speaker: "Caller",
        message:
          "Hi, I'm interested in learning English. What programs do you offer?",
        timestamp: "10:30:15",
      },
      {
        speaker: "AI Agent",
        message:
          "We offer three comprehensive programs: Beginner, Intermediate, and Advanced. Each program is tailored to your current level and learning goals. Would you like to hear more about a specific level?",
        timestamp: "10:30:30",
      },
      {
        speaker: "Caller",
        message: "Yes, tell me about the intermediate program.",
        timestamp: "10:30:50",
      },
      {
        speaker: "AI Agent",
        message:
          "Our Intermediate program includes 40 hours of instruction, interactive exercises, and personalized feedback. It covers grammar, vocabulary expansion, conversation skills, and business English basics. The price is $299 for the full course.",
        timestamp: "10:31:00",
      },
      {
        speaker: "Caller",
        message: "That sounds good. What are the available time slots?",
        timestamp: "10:31:25",
      },
      {
        speaker: "AI Agent",
        message:
          "We have flexible scheduling options: weekday mornings, evenings, and weekend sessions. Classes can be taken at your own pace or in structured weekly sessions. Which would you prefer?",
        timestamp: "10:31:40",
      },
      {
        speaker: "Caller",
        message:
          "I think evening sessions would work best for me. Can someone call me back to complete the enrollment?",
        timestamp: "10:32:00",
      },
      {
        speaker: "AI Agent",
        message:
          "Absolutely! I'll arrange for our enrollment team to call you back within 24 hours. May I have your preferred contact number?",
        timestamp: "10:32:20",
      },
      {
        speaker: "Caller",
        message: "Sure, it's 555-0123.",
        timestamp: "10:32:35",
      },
      {
        speaker: "AI Agent",
        message:
          "Perfect! I've noted your interest in the Intermediate program with evening sessions. Our team will contact you at 555-0123 within 24 hours. Is there anything else I can help you with today?",
        timestamp: "10:32:45",
      },
      {
        speaker: "Caller",
        message: "No, that's all. Thank you!",
        timestamp: "10:33:00",
      },
      {
        speaker: "AI Agent",
        message:
          "You're welcome! Have a great day and we look forward to helping you improve your English!",
        timestamp: "10:33:10",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-white/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Conversation Details</h1>
            <p className="text-gray-600 mt-1">ID: {conversationData.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-white">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-white">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Call Info Card */}
        <Card className="bg-white/90 backdrop-blur border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Agent</p>
                  <p className="font-semibold">{conversationData.agentName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{conversationData.callDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{conversationData.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">
                    {conversationData.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="bg-white/90 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Conversation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {conversationData.summary}
            </p>
          </CardContent>
        </Card>

        {/* Transcript Card with Scrollable Content */}
        <Card className="bg-white/90 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Full Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="space-y-4">
                {conversationData.transcript.map((entry, index) => (
                  <div key={index}>
                    <div
                      className={`flex gap-4 ${
                        entry.speaker === "AI Agent"
                          ? "flex-row"
                          : "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          entry.speaker === "AI Agent"
                            ? "bg-blue-600"
                            : "bg-gray-400"
                        }`}
                      >
                        <span className="text-white font-semibold text-sm">
                          {entry.speaker === "AI Agent" ? "AI" : "C"}
                        </span>
                      </div>
                      <div
                        className={`flex-1 ${
                          entry.speaker === "AI Agent"
                            ? "text-left"
                            : "text-right"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-semibold text-sm ${
                              entry.speaker === "AI Agent"
                                ? "text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            {entry.speaker}
                          </span>
                          <span className="text-xs text-gray-500">
                            {entry.timestamp}
                          </span>
                        </div>
                        <div
                          className={`inline-block px-4 py-3 rounded-2xl ${
                            entry.speaker === "AI Agent"
                              ? "bg-blue-50 text-gray-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {entry.message}
                          </p>
                        </div>
                      </div>
                    </div>
                    {index < conversationData.transcript.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
