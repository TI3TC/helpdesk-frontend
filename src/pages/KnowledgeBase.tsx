import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Star, Clock } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Como resetar sua senha",
    description: "Passo a passo para resetar sua senha de acesso ao sistema",
    category: "Acesso",
    tags: ["senha", "login", "acesso"],
    views: 1250,
    helpful: 98,
    lastUpdated: "2024-01-10"
  },
  {
    id: 2,
    title: "Configurando sua impressora",
    description: "Guia completo para configurar impressoras na rede corporativa",
    category: "Hardware",
    tags: ["impressora", "configuração", "rede"],
    views: 890,
    helpful: 85,
    lastUpdated: "2024-01-08"
  },
  {
    id: 3,
    title: "Problemas comuns de email",
    description: "Soluções para os problemas mais frequentes com email corporativo",
    category: "Email",
    tags: ["email", "outlook", "problemas"],
    views: 2100,
    helpful: 92,
    lastUpdated: "2024-01-12"
  },
  {
    id: 4,
    title: "Acessando VPN corporativa",
    description: "Como configurar e usar a VPN para trabalho remoto",
    category: "Rede",
    tags: ["vpn", "remoto", "acesso"],
    views: 756,
    helpful: 89,
    lastUpdated: "2024-01-05"
  },
  {
    id: 5,
    title: "Backup de arquivos",
    description: "Melhores práticas para fazer backup de seus arquivos importantes",
    category: "Segurança",
    tags: ["backup", "arquivos", "segurança"],
    views: 445,
    helpful: 95,
    lastUpdated: "2024-01-15"
  },
  {
    id: 6,
    title: "Instalando software corporativo",
    description: "Guia para instalar aplicativos aprovados pela empresa",
    category: "Software",
    tags: ["software", "instalação", "aplicativos"],
    views: 623,
    helpful: 87,
    lastUpdated: "2024-01-09"
  }
];

const categories = ["Todos", "Acesso", "Hardware", "Email", "Rede", "Segurança", "Software"];

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "Todos" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Acesso": "bg-blue-100 text-blue-800",
      "Hardware": "bg-green-100 text-green-800", 
      "Email": "bg-yellow-100 text-yellow-800",
      "Rede": "bg-purple-100 text-purple-800",
      "Segurança": "bg-red-100 text-red-800",
      "Software": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Base de Conhecimento</h1>
        <div className="flex items-center text-muted-foreground">
          <BookOpen className="h-5 w-5 mr-2" />
          <span>{filteredArticles.length} artigos encontrados</span>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Artigos</CardTitle>
          <CardDescription>
            Encontre respostas para suas dúvidas mais comuns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por palavra-chave, problema ou solução..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  {article.helpful}%
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">
                {article.title}
              </CardTitle>
              <CardDescription>
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.lastUpdated}
                  </div>
                  <div>
                    {article.views.toLocaleString()} visualizações
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Ler Artigo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Nenhum artigo encontrado com os critérios de busca.
            </p>
            <p className="text-sm text-muted-foreground">
              Tente usar palavras-chave diferentes ou remover os filtros.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}