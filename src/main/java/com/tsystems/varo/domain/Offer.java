package com.tsystems.varo.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.tsystems.varo.domain.enumeration.Language;

/**
 * A Offer.
 */
@Entity
@Table(name = "offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "caption")
    private String caption;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @Column(name = "offer_date")
    private Instant offerDate;

    @OneToMany(mappedBy = "offer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CustomAttribute> customAttributes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("offers")
    private Template template;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_customer",
               joinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "customer_id", referencedColumnName = "id"))
    private Set<Company> customers = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_customer_manager",
               joinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "customer_manager_id", referencedColumnName = "id"))
    private Set<Person> customerManagers = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_vendor",
               joinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "vendor_id", referencedColumnName = "id"))
    private Set<Company> vendors = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_vendor_manager",
               joinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "vendor_manager_id", referencedColumnName = "id"))
    private Set<Person> vendorManagers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public Offer caption(String caption) {
        this.caption = caption;
        return this;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public Language getLanguage() {
        return language;
    }

    public Offer language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Instant getOfferDate() {
        return offerDate;
    }

    public Offer offerDate(Instant offerDate) {
        this.offerDate = offerDate;
        return this;
    }

    public void setOfferDate(Instant offerDate) {
        this.offerDate = offerDate;
    }

    public Set<CustomAttribute> getCustomAttributes() {
        return customAttributes;
    }

    public Offer customAttributes(Set<CustomAttribute> customAttributes) {
        this.customAttributes = customAttributes;
        return this;
    }

    public Offer addCustomAttribute(CustomAttribute customAttribute) {
        this.customAttributes.add(customAttribute);
        customAttribute.setOffer(this);
        return this;
    }

    public Offer removeCustomAttribute(CustomAttribute customAttribute) {
        this.customAttributes.remove(customAttribute);
        customAttribute.setOffer(null);
        return this;
    }

    public void setCustomAttributes(Set<CustomAttribute> customAttributes) {
        this.customAttributes = customAttributes;
    }

    public Template getTemplate() {
        return template;
    }

    public Offer template(Template template) {
        this.template = template;
        return this;
    }

    public void setTemplate(Template template) {
        this.template = template;
    }

    public Set<Company> getCustomers() {
        return customers;
    }

    public Offer customers(Set<Company> companies) {
        this.customers = companies;
        return this;
    }

    public Offer addCustomer(Company company) {
        this.customers.add(company);
        company.getReceivedOffers().add(this);
        return this;
    }

    public Offer removeCustomer(Company company) {
        this.customers.remove(company);
        company.getReceivedOffers().remove(this);
        return this;
    }

    public void setCustomers(Set<Company> companies) {
        this.customers = companies;
    }

    public Set<Person> getCustomerManagers() {
        return customerManagers;
    }

    public Offer customerManagers(Set<Person> people) {
        this.customerManagers = people;
        return this;
    }

    public Offer addCustomerManager(Person person) {
        this.customerManagers.add(person);
        person.getReceivedOffers().add(this);
        return this;
    }

    public Offer removeCustomerManager(Person person) {
        this.customerManagers.remove(person);
        person.getReceivedOffers().remove(this);
        return this;
    }

    public void setCustomerManagers(Set<Person> people) {
        this.customerManagers = people;
    }

    public Set<Company> getVendors() {
        return vendors;
    }

    public Offer vendors(Set<Company> companies) {
        this.vendors = companies;
        return this;
    }

    public Offer addVendor(Company company) {
        this.vendors.add(company);
        company.getSentOffers().add(this);
        return this;
    }

    public Offer removeVendor(Company company) {
        this.vendors.remove(company);
        company.getSentOffers().remove(this);
        return this;
    }

    public void setVendors(Set<Company> companies) {
        this.vendors = companies;
    }

    public Set<Person> getVendorManagers() {
        return vendorManagers;
    }

    public Offer vendorManagers(Set<Person> people) {
        this.vendorManagers = people;
        return this;
    }

    public Offer addVendorManager(Person person) {
        this.vendorManagers.add(person);
        person.getSentOffers().add(this);
        return this;
    }

    public Offer removeVendorManager(Person person) {
        this.vendorManagers.remove(person);
        person.getSentOffers().remove(this);
        return this;
    }

    public void setVendorManagers(Set<Person> people) {
        this.vendorManagers = people;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Offer)) {
            return false;
        }
        return id != null && id.equals(((Offer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Offer{" +
            "id=" + getId() +
            ", caption='" + getCaption() + "'" +
            ", language='" + getLanguage() + "'" +
            ", offerDate='" + getOfferDate() + "'" +
            "}";
    }
}
