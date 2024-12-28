Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :listing_types
      resources :shop_locations
      resources :sub_catogories
      
      resources :product_types
      resources :vendors
      
      resources :variants
      resources :option_value_sets
      resources :option_type_sets
      resources :products do
        resources :option_types 
      end 
    
      resources :variants 
      resources :vendors, only: [] do
        member do
          get :code
        end
      end
      resources :categories do
        get :sub_categories, on: :member
      end
      root "products#new"
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
