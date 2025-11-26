import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Наушники Premium',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/7c327823-9243-437a-886a-8f40e9b39fc7/files/2e6e2d3f-df4d-4f1a-85ab-da3a864a6ede.jpg',
    category: 'Аудио',
    description: 'Беспроводные наушники с активным шумоподавлением'
  },
  {
    id: 2,
    name: 'Смарт-часы Sport',
    price: 8990,
    image: 'https://cdn.poehali.dev/projects/7c327823-9243-437a-886a-8f40e9b39fc7/files/555f3a88-ee43-490e-a4ed-075c64bcbd78.jpg',
    category: 'Гаджеты',
    description: 'Фитнес-трекер с мониторингом здоровья'
  },
  {
    id: 3,
    name: 'Ноутбук Pro',
    price: 89990,
    image: 'https://cdn.poehali.dev/projects/7c327823-9243-437a-886a-8f40e9b39fc7/files/37b0c3c5-3571-4f9d-a86e-e8c85e04c353.jpg',
    category: 'Компьютеры',
    description: 'Мощный ноутбук для работы и творчества'
  },
  {
    id: 4,
    name: 'Наушники Classic',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/7c327823-9243-437a-886a-8f40e9b39fc7/files/2e6e2d3f-df4d-4f1a-85ab-da3a864a6ede.jpg',
    category: 'Аудио',
    description: 'Проводные наушники с отличным звуком'
  },
  {
    id: 5,
    name: 'Смарт-часы Elite',
    price: 15990,
    image: 'https://cdn.poehali.dev/projects/7c327823-9243-437a-886a-8f40e9b39fc7/files/555f3a88-ee43-490e-a4ed-075c64bcbd78.jpg',
    category: 'Гаджеты',
    description: 'Премиум смарт-часы с GPS и NFC'
  },
  {
    id: 6,
    name: 'Ноутбук Ultra',
    price: 129990,
    image: 'https://cdn.poehali.dev/projects/7c327823-9243-437a-886a-8f40e9b39fc7/files/37b0c3c5-3571-4f9d-a86e-e8c85e04c353.jpg',
    category: 'Компьютеры',
    description: 'Топовая модель для профессионалов'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">R</span>
            </div>
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Rune
            </h1>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-accent">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">Корзина</SheetTitle>
                <SheetDescription>
                  {totalItems === 0 ? 'Ваша корзина пуста' : `${totalItems} товаров в корзине`}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-4 max-h-[60vh] overflow-y-auto">
                {cart.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-destructive"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {cart.length > 0 && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Итого:</span>
                    <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 animate-fade-in" variant="secondary">
            Новая коллекция 2024
          </Badge>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Rune Store
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            Современные технологии для вашей жизни. Доставка по всей России.
          </p>
          <Button size="lg" className="animate-scale-in group">
            Смотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="transition-all"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-muted to-muted/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-foreground">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-display text-xl mb-2">{product.name}</CardTitle>
                <CardDescription className="text-sm mb-4">{product.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full group"
                  onClick={() => addToCart(product)}
                >
                  <Icon name="ShoppingBag" size={18} className="mr-2" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
              <h2 className="text-4xl font-display font-bold mb-4">Доставка</h2>
              <p className="text-lg text-muted-foreground">
                Быстрая и надёжная доставка по всей России
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name="Package" size={32} className="mx-auto mb-2 text-secondary" />
                  <CardTitle className="font-display">Курьером</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Доставка в день заказа по Москве и МО</p>
                  <p className="font-semibold mt-2 text-primary">от 350 ₽</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name="MapPin" size={32} className="mx-auto mb-2 text-accent" />
                  <CardTitle className="font-display">Пункт выдачи</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Более 5000 пунктов по России</p>
                  <p className="font-semibold mt-2 text-primary">от 200 ₽</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name="Store" size={32} className="mx-auto mb-2 text-primary" />
                  <CardTitle className="font-display">Самовывоз</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Из наших магазинов в вашем городе</p>
                  <p className="font-semibold mt-2 text-primary">Бесплатно</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
              <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="Gift" size={24} className="text-accent" />
                Условия доставки
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Бесплатная доставка при заказе от 5000 ₽</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Срок доставки по России 2-7 дней</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Отслеживание заказа в личном кабинете</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Возможность примерки при получении</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground/5 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-display">© 2024 Rune Store. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
