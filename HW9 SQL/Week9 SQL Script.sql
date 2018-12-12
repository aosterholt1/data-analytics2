
-- * 1a. Display the first and last names of all actors from the table `actor`.
use sakila;

select actor.first_name, actor.last_name
from actor;

-- * 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column `Actor Name`.

select concat(first_name,  ' ', last_name) as ' Actor Full Name'
from actor;

-- * 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
select actor_id, first_name, last_name
from actor
where first_name = "JOE";

-- * 2b. Find all actors whose last name contain the letters `GEN`:
select first_name, last_name 
from actor 
where last_name like '%GEN%';

-- * 2c. Find all actors whose last names contain the letters `LI`. This time, order the rows by last name and first name, in that order:
select first_name, last_name 
from actor 
where last_name like '%LI%'
order by last_name, first_name;

-- * 2d. Using `IN`, display the `country_id` and `country` columns of the following countries: Afghanistan, Bangladesh, and China:

select country_id, country
from country
where country in ('Afghanistan', 'Bangladesh', 'China');

-- * 3a. You want to keep a description of each actor. You don't think you will be performing queries on a description, so create a column in the table `actor` named `description` and use the data type `BLOB` (Make sure to research the type `BLOB`, as the difference between it and `VARCHAR` are significant).

alter table actor
add description blob;


-- * 3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the `description` column.

alter table actor
drop column description;

-- * 4a. List the last names of actors, as well as how many actors have that last name.
select last_name, count(*) as count_lastname
from actor
group by last_name;

-- * 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors

select last_name, count(*) as count_lastname
from actor
group by last_name
having count_lastname > 1;

-- * 4c. The actor `HARPO WILLIAMS` was accidentally entered in the `actor` table as `GROUCHO WILLIAMS`. Write a query to fix the record.

update actor
set first_name = 'HARPO'
where first_name = 'GROUCHO' and last_name = 'WILLIAMS';

-- * 4d. Perhaps we were too hasty in changing `GROUCHO` to `HARPO`. It turns out that `GROUCHO` was the correct name after all! In a single query, if the first name of the actor is currently `HARPO`, change it to `GROUCHO`.
update actor 
set first_name= 'GROUCHO'
where first_name='HARPO' and last_name='WILLIAMS';

-- * 5a. You cannot locate the schema of the `address` table. Which query would you use to re-create it?
show create table address;
--   * Hint: [https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html](https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html)


-- * 6a. Use `JOIN` to display the first and last names, as well as the address, of each staff member. Use the tables `staff` and `address`:
select staff.first_name, staff.last_name, address.address
from staff
left join address on 
address.address_id = staff.address_id;


-- * 6b. Use `JOIN` to display the total amount rung up by each staff member in August of 2005. Use tables `staff` and `payment`.
select first_name, last_name, sum(amount) as "Total Sales by Staff Member"
from payment
left join staff on
staff.staff_id = payment.staff_id
group by first_name, last_name;



-- * 6c. List each film and the number of actors who are listed for that film. Use tables `film_actor` and `film`. Use inner join.

select title, count(*) as "Total Actors"
from film_actor
inner join film on
film.film_id = film_actor.film_id
group by title;

-- * 6d. How many copies of the film `Hunchback Impossible` exist in the inventory system?
select title, count(*) as "Total Copies"
from inventory
inner join film on
film.film_id = inventory.film_id
group by title
having title = "Hunchback Impossible";

-- * 6e. Using the tables `payment` and `customer` and the `JOIN` command, list the total paid by each customer. List the customers alphabetically by last name:

select last_name, first_name, sum(amount) as "Total Paid by Customer"
from payment
inner join customer on
customer.customer_id = payment.customer_id
group by last_name, first_name
order by  last_name;

--   ![Total amount paid](Images/total_payment.png)

-- * 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters `K` and `Q` have also soared in popularity. Use subqueries to display the titles of movies starting with the letters `K` and `Q` whose language is English.

select title
from film
where (title like 'K%' or title like 'Q%')
and language_id = 	
	(select language_id from language where name = 'English');
	

-- * 7b. Use subqueries to display all actors who appear in the film `Alone Trip`.
select first_name, last_name
from actor
where actor_id in (
	select actor_id
	from film_actor
    where film_id in (
		select film_id
        from film
        where title = 'Alone Trip') 
        ); 
        
        
-- * 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.
select first_name, last_name, email, country
from customer
join address on (address.address_id = customer.address_id)
join city on (city.city_id = address.city_id)
join country on (country.country_id = city.country_id)
having country = 'Canada';

-- * 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as _family_ films.

select title, name
from film
join film_category on (film_category.film_id = film.film_id)
join category on (category.category_id = film_category.category_id)
having name = "Family";


-- * 7e. Display the most frequently rented movies in descending order.
select title, count(film.film_id) AS 'Count_of_Rentals'
from film
join inventory on (film.film_id= inventory.film_id)
join rental on (inventory.inventory_id =rental.inventory_id)
group by title order by Count_of_Rentals desc;

-- * 7f. Write a query to display how much business, in dollars, each store brought in.
select staff.store_id, sum(amount) as 'Total Dollars by Store'
from payment
join staff on (payment.staff_id = staff.staff_id)
join store on (staff.store_id = store.store_id)
group by staff.store_id;

-- * 7g. Write a query to display for each store its store ID, city, and country.
select store_id, city, country
from store
join address on (store.address_id = address.address_id)
join city on (address.city_id = city.city_id)
join country on (country.country_id = city.country_id)
group by store_id;
-- * 7h. List the top five genres in gross revenue in descending order. (**Hint**: you may need to use the following tables: category, film_category, inventory, payment, and rental.)

select name as "Top_Five_Genres", sum(payment.amount) as "Gross_Revenue" 
from category 
join film_category on (category.category_id = film_category.category_id)
join inventory on (inventory.film_id = film_category.film_id)
join rental on (inventory.inventory_id = rental.inventory_id)
join payment on (rental.rental_id=payment.rental_id)
group by name order by Gross_Revenue limit 5;

-- * 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.
create view genre_view as
select name as "Top_Five_Genres", sum(payment.amount) as "Gross_Revenue" 
from category 
join film_category on (category.category_id = film_category.category_id)
join inventory on (inventory.film_id = film_category.film_id)
join rental on (inventory.inventory_id = rental.inventory_id)
join payment on (rental.rental_id=payment.rental_id)
group by name order by Gross_Revenue limit 5;

-- * 8b. How would you display the view that you created in 8a?
select * from genre_view;

-- * 8c. You find that you no longer need the view `top_five_genres`. Write a query to delete it.
drop view genre_view