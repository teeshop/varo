package com.tsystems.varo.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JsonIgnoreProperties("people")
    private Company company;

    @ManyToMany(mappedBy = "customerManagers")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Offer> receivedOffers = new HashSet<>();

    @ManyToMany(mappedBy = "vendorManagers")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Offer> sentOffers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public Person firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public Person lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public Person phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public Person email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Company getCompany() {
        return company;
    }

    public Person company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Set<Offer> getReceivedOffers() {
        return receivedOffers;
    }

    public Person receivedOffers(Set<Offer> offers) {
        this.receivedOffers = offers;
        return this;
    }

    public Person addReceivedOffers(Offer offer) {
        this.receivedOffers.add(offer);
        offer.getCustomerManagers().add(this);
        return this;
    }

    public Person removeReceivedOffers(Offer offer) {
        this.receivedOffers.remove(offer);
        offer.getCustomerManagers().remove(this);
        return this;
    }

    public void setReceivedOffers(Set<Offer> offers) {
        this.receivedOffers = offers;
    }

    public Set<Offer> getSentOffers() {
        return sentOffers;
    }

    public Person sentOffers(Set<Offer> offers) {
        this.sentOffers = offers;
        return this;
    }

    public Person addSentOffers(Offer offer) {
        this.sentOffers.add(offer);
        offer.getVendorManagers().add(this);
        return this;
    }

    public Person removeSentOffers(Offer offer) {
        this.sentOffers.remove(offer);
        offer.getVendorManagers().remove(this);
        return this;
    }

    public void setSentOffers(Set<Offer> offers) {
        this.sentOffers = offers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Person)) {
            return false;
        }
        return id != null && id.equals(((Person) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", firstname='" + getFirstname() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", phone='" + getPhone() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
